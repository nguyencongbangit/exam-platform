export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Tính điểm thành tích theo chế độ và điểm số (thang 10)
// Hard: 10đ → 5pts | >9đ → 3pts | >8đ → 1pt
// Medium: ≥9đ → 1pt
// Easy: 10đ → 1pt
// Giới hạn: 2 lần/ngày/môn
// Môn được thưởng sao theo trình độ
const ELIGIBLE_SUBJECTS: Record<string, string[]> = {
  'grade-7': ['sub-toan', 'sub-van', 'sub-anh'],
  'grade-5': ['sub-toan', 'sub-anh', 'sub-tieng-viet'],
};

async function awardPoints(
  studentId: string,
  attemptId: string,
  subjectId: string,
  practiceMode: string,
  score: number,
  gradeId: string | null,
): Promise<{ points: number; reason: string } | null> {
  // Chỉ tính điểm cho HARD, MEDIUM và EASY
  if (practiceMode !== 'HARD' && practiceMode !== 'MEDIUM' && practiceMode !== 'EASY') return null;

  // Chỉ thưởng cho 3 môn chính theo trình độ
  if (!gradeId || !ELIGIBLE_SUBJECTS[gradeId]?.includes(subjectId)) return null;

  // Xác định điểm sẽ được cộng
  let points = 0;
  let reason = '';
  if (practiceMode === 'HARD') {
    if (score >= 10)     { points = 5; reason = 'HARD_PERFECT'; }
    else if (score > 9)  { points = 3; reason = 'HARD_GREAT'; }
    else if (score > 8)  { points = 1; reason = 'HARD_GOOD'; }
  } else if (practiceMode === 'MEDIUM') {
    if (score >= 9)      { points = 1; reason = 'MEDIUM_GOOD'; }
  } else if (practiceMode === 'EASY') {
    if (score >= 10)     { points = 1; reason = 'EASY_PERFECT'; }
  }
  if (points === 0) return null;

  // Tiếng Anh được nhân đôi điểm thưởng
  if (subjectId === 'sub-anh') points *= 2;

  // Kiểm tra giới hạn 2 lần/ngày/môn
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayCount = await prisma.studentPoint.count({
    where: { studentId, subjectId, earnedAt: { gte: todayStart } },
  });
  if (todayCount >= 2) return null;

  await prisma.studentPoint.create({
    data: { studentId, subjectId, attemptId, points, reason },
  });
  return { points, reason };
}

// Check and award achievements, return newly earned ones
async function checkAchievements(studentId: string, score: number, correctCount: number, answers: { isCorrect: boolean | null }[]) {
  const [allAchievements, alreadyEarned] = await Promise.all([
    prisma.achievement.findMany(),
    prisma.studentAchievement.findMany({ where: { studentId }, select: { achievementId: true } }),
  ]);

  const earnedSet = new Set(alreadyEarned.map(e => e.achievementId));
  const toCheck = allAchievements.filter(a => !earnedSet.has(a.id));
  if (toCheck.length === 0) return [];

  // Pre-fetch data needed for condition checks
  const [totalAttempts, allSubmitted] = await Promise.all([
    prisma.attempt.count({ where: { studentId, status: 'SUBMITTED' } }),
    prisma.attempt.findMany({
      where: { studentId, status: 'SUBMITTED' },
      select: { submittedAt: true },
    }),
  ]);

  const studyDays = new Set(allSubmitted.map(a => a.submittedAt?.toDateString())).size;

  // Max consecutive correct in this attempt (for CORRECT_STREAK)
  let maxStreak = 0, curStreak = 0;
  for (const ans of answers) {
    if (ans.isCorrect === true) { curStreak++; maxStreak = Math.max(maxStreak, curStreak); }
    else { curStreak = 0; }
  }

  const newlyEarned: { id: string; name: string; icon: string; description: string }[] = [];

  for (const achievement of toCheck) {
    let qualified = false;
    const val = achievement.conditionValue;

    switch (achievement.conditionType) {
      case 'EXAM_COUNT':
        qualified = totalAttempts >= val;
        break;
      case 'SCORE_TARGET':
        qualified = score >= val;
        break;
      case 'STUDY_DAYS':
        qualified = studyDays >= val;
        break;
      case 'CORRECT_STREAK':
        qualified = maxStreak >= val;
        break;
    }

    if (qualified) {
      await prisma.studentAchievement.create({ data: { studentId, achievementId: achievement.id } });
      newlyEarned.push({ id: achievement.id, name: achievement.name, icon: achievement.icon, description: achievement.description });
    }
  }

  return newlyEarned;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { timeSpentSeconds } = await req.json();

  const attempt = await prisma.attempt.findUnique({
    where: { id: params.id },
    include: {
      exam: {
        include: { questions: { include: { question: { include: { options: true } } } } },
      },
      attemptQuestions: true,
      answers: true,
    },
  });


  if (!attempt || attempt.status !== 'IN_PROGRESS') {
    return NextResponse.json({ error: 'Invalid attempt' }, { status: 400 });
  }

  const questionIds = attempt.practiceMode
    ? attempt.attemptQuestions.map((aq) => aq.questionId)
    : attempt.exam!.questions.map((eq) => eq.questionId);

  const totalQuestions = questionIds.length;
  let correctCount = 0;
  let wrongCount = 0;
  let blankCount = 0;

  for (const questionId of questionIds) {
    const answer = attempt.answers.find((a) => a.questionId === questionId);
    if (!answer || !answer.selectedOptionId) {
      blankCount++;
    } else if (answer.isCorrect) {
      correctCount++;
    } else {
      wrongCount++;
    }
  }

  const maxScore = attempt.practiceMode ? 10 : (attempt.exam?.maxScore ?? 10);
  const score = totalQuestions > 0 ? (correctCount / totalQuestions) * maxScore : 0;

  await prisma.attempt.update({
    where: { id: params.id },
    data: {
      status: 'SUBMITTED',
      submittedAt: new Date(),
      score,
      correctCount,
      wrongCount,
      blankCount,
      timeSpentSeconds: timeSpentSeconds || 0,
    },
  });

  // Update per-question stats
  for (const answer of attempt.answers) {
    if (answer.isCorrect !== null) {
      await prisma.studentQuestionStat.upsert({
        where: { studentId_questionId: { studentId: attempt.studentId, questionId: answer.questionId } },
        update: {
          attemptCount: { increment: 1 },
          correctCount: answer.isCorrect ? { increment: 1 } : undefined,
          wrongCount: !answer.isCorrect ? { increment: 1 } : undefined,
          lastAnsweredAt: new Date(),
          lastResult: answer.isCorrect,
        },
        create: {
          studentId: attempt.studentId,
          questionId: answer.questionId,
          attemptCount: 1,
          correctCount: answer.isCorrect ? 1 : 0,
          wrongCount: answer.isCorrect ? 0 : 1,
          lastAnsweredAt: new Date(),
          lastResult: answer.isCorrect,
        },
      });
    }
  }

  // Check and award achievements
  const newAchievements = await checkAchievements(
    attempt.studentId,
    score,
    correctCount,
    attempt.answers.map(a => ({ isCorrect: a.isCorrect })),
  );

  // Tích điểm thành tích (chỉ cho practice HARD/MEDIUM, tối đa 2 lần/ngày/môn)
  let pointsEarned: { points: number; reason: string } | null = null;
  if (attempt.practiceMode && attempt.subjectId) {
    const student = await prisma.student.findUnique({
      where: { id: attempt.studentId },
      select: { gradeId: true },
    });
    pointsEarned = await awardPoints(
      attempt.studentId,
      attempt.id,
      attempt.subjectId,
      attempt.practiceMode,
      score,
      student?.gradeId ?? null,
    );
  }

  return NextResponse.json({ score, correctCount, wrongCount, blankCount, newAchievements, pointsEarned });
}
