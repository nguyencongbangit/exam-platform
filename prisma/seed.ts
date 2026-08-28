import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Grades
  const grades = await Promise.all([
    prisma.grade.upsert({ where: { id: 'grade-5' }, update: {}, create: { id: 'grade-5', name: 'Lớp 5', sortOrder: 5 } }),
    prisma.grade.upsert({ where: { id: 'grade-6' }, update: {}, create: { id: 'grade-6', name: 'Lớp 6', sortOrder: 6 } }),
    prisma.grade.upsert({ where: { id: 'grade-7' }, update: {}, create: { id: 'grade-7', name: 'Lớp 7', sortOrder: 7 } }),
    prisma.grade.upsert({ where: { id: 'grade-8' }, update: {}, create: { id: 'grade-8', name: 'Lớp 8', sortOrder: 8 } }),
    prisma.grade.upsert({ where: { id: 'grade-9' }, update: {}, create: { id: 'grade-9', name: 'Lớp 9', sortOrder: 9 } }),
    prisma.grade.upsert({ where: { id: 'grade-10' }, update: {}, create: { id: 'grade-10', name: 'Lớp 10', sortOrder: 10 } }),
    prisma.grade.upsert({ where: { id: 'grade-11' }, update: {}, create: { id: 'grade-11', name: 'Lớp 11', sortOrder: 11 } }),
    prisma.grade.upsert({ where: { id: 'grade-12' }, update: {}, create: { id: 'grade-12', name: 'Lớp 12', sortOrder: 12 } }),
  ]);

  // Create Subjects
  const subjects = await Promise.all([
    prisma.subject.upsert({ where: { code: 'TOAN' }, update: {}, create: { id: 'sub-toan', name: 'Toán học', code: 'TOAN', description: 'Môn Toán học', icon: '📐' } }),
    prisma.subject.upsert({ where: { code: 'TIENG_VIET' }, update: {}, create: { id: 'sub-tieng-viet', name: 'Tiếng Việt', code: 'TIENG_VIET', description: 'Môn Tiếng Việt (Tiểu học)', icon: '📖' } }),
    prisma.subject.upsert({ where: { code: 'VAN' }, update: {}, create: { id: 'sub-van', name: 'Ngữ Văn', code: 'VAN', description: 'Môn Ngữ Văn', icon: '📚' } }),
    prisma.subject.upsert({ where: { code: 'ANH' }, update: {}, create: { id: 'sub-anh', name: 'Tiếng Anh', code: 'ANH', description: 'Môn Tiếng Anh', icon: '🌍' } }),
    prisma.subject.upsert({ where: { code: 'LY' }, update: {}, create: { id: 'sub-ly', name: 'Vật Lý', code: 'LY', description: 'Môn Vật Lý', icon: '⚡' } }),
    prisma.subject.upsert({ where: { code: 'HOA' }, update: {}, create: { id: 'sub-hoa', name: 'Hóa Học', code: 'HOA', description: 'Môn Hóa Học', icon: '🧪' } }),
    prisma.subject.upsert({ where: { code: 'SINH' }, update: {}, create: { id: 'sub-sinh', name: 'Sinh Học', code: 'SINH', description: 'Môn Sinh Học', icon: '🌿' } }),
  ]);

  // Create Topics for Toán 9
  const topics = await Promise.all([
    prisma.topic.upsert({ where: { id: 'topic-dso' }, update: {}, create: { id: 'topic-dso', subjectId: 'sub-toan', gradeId: 'grade-9', name: 'Đại số', sortOrder: 1 } }),
    prisma.topic.upsert({ where: { id: 'topic-hhoc' }, update: {}, create: { id: 'topic-hhoc', subjectId: 'sub-toan', gradeId: 'grade-9', name: 'Hình học', sortOrder: 2 } }),
    prisma.topic.upsert({ where: { id: 'topic-hso' }, update: {}, create: { id: 'topic-hso', subjectId: 'sub-toan', gradeId: 'grade-9', name: 'Hàm số', sortOrder: 3 } }),
    prisma.topic.upsert({ where: { id: 'topic-ptbc2' }, update: {}, create: { id: 'topic-ptbc2', subjectId: 'sub-toan', gradeId: 'grade-9', name: 'Phương trình bậc hai', sortOrder: 4 } }),
    prisma.topic.upsert({ where: { id: 'topic-hpt' }, update: {}, create: { id: 'topic-hpt', subjectId: 'sub-toan', gradeId: 'grade-9', name: 'Hệ phương trình', sortOrder: 5 } }),
    prisma.topic.upsert({ where: { id: 'topic-xs' }, update: {}, create: { id: 'topic-xs', subjectId: 'sub-toan', gradeId: 'grade-9', name: 'Xác suất - Thống kê', sortOrder: 6 } }),
  ]);

  // Create Topics for Toán 5
  await Promise.all([
    prisma.topic.upsert({ where: { id: 'topic5-so' }, update: {}, create: { id: 'topic5-so', subjectId: 'sub-toan', gradeId: 'grade-5', name: 'Số tự nhiên và phân số', sortOrder: 1 } }),
    prisma.topic.upsert({ where: { id: 'topic5-phan-so' }, update: {}, create: { id: 'topic5-phan-so', subjectId: 'sub-toan', gradeId: 'grade-5', name: 'Phân số', sortOrder: 2 } }),
    prisma.topic.upsert({ where: { id: 'topic5-so-tp' }, update: {}, create: { id: 'topic5-so-tp', subjectId: 'sub-toan', gradeId: 'grade-5', name: 'Số thập phân', sortOrder: 3 } }),
    prisma.topic.upsert({ where: { id: 'topic5-do-luong' }, update: {}, create: { id: 'topic5-do-luong', subjectId: 'sub-toan', gradeId: 'grade-5', name: 'Đo lường', sortOrder: 4 } }),
    prisma.topic.upsert({ where: { id: 'topic5-hinh-hoc' }, update: {}, create: { id: 'topic5-hinh-hoc', subjectId: 'sub-toan', gradeId: 'grade-5', name: 'Hình học', sortOrder: 5 } }),
    prisma.topic.upsert({ where: { id: 'topic5-toan-co-van' }, update: {}, create: { id: 'topic5-toan-co-van', subjectId: 'sub-toan', gradeId: 'grade-5', name: 'Toán có lời văn', sortOrder: 6 } }),
  ]);

  // Create Users
  const adminPw = await bcrypt.hash('Admin@123', 10);
  const teacherPw = await bcrypt.hash('Teacher@123', 10);
  const studentPw = await bcrypt.hash('Student@123', 10);
  const parentPw = await bcrypt.hash('Parent@123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@exam.vn' },
    update: {},
    create: { id: 'user-admin', email: 'admin@exam.vn', passwordHash: adminPw, fullName: 'Quản trị viên', role: 'ADMIN' },
  });

  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@exam.vn' },
    update: {},
    create: { id: 'user-teacher', email: 'teacher@exam.vn', passwordHash: teacherPw, fullName: 'Giáo viên Nguyễn Văn A', role: 'TEACHER' },
  });

  await prisma.teacher.upsert({
    where: { userId: 'user-teacher' },
    update: {},
    create: { id: 'teacher-1', userId: 'user-teacher' },
  });

  const studentUser = await prisma.user.upsert({
    where: { email: 'student@exam.vn' },
    update: {},
    create: { id: 'user-student', email: 'student@exam.vn', passwordHash: studentPw, fullName: 'Học sinh Trần Thị B', role: 'STUDENT' },
  });

  const student = await prisma.student.upsert({
    where: { userId: 'user-student' },
    update: {},
    create: { id: 'student-1', userId: 'user-student', studentCode: 'HS2024001', gradeId: 'grade-9', schoolName: 'THCS Nguyễn Du', targetScore: 8.5 },
  });

  const parentUser = await prisma.user.upsert({
    where: { email: 'parent@exam.vn' },
    update: {},
    create: { id: 'user-parent', email: 'parent@exam.vn', passwordHash: parentPw, fullName: 'Phụ huynh Lê Văn C', role: 'PARENT' },
  });

  const parent = await prisma.parent.upsert({
    where: { userId: 'user-parent' },
    update: {},
    create: { id: 'parent-1', userId: 'user-parent' },
  });

  // Link student-parent
  await prisma.studentParent.upsert({
    where: { studentId_parentId: { studentId: 'student-1', parentId: 'parent-1' } },
    update: {},
    create: { studentId: 'student-1', parentId: 'parent-1', relationship: 'PARENT', isPrimary: true },
  });

  // Create Achievements
  const achievements = [
    { id: 'ach-1', name: 'Khởi đầu', description: 'Hoàn thành bài thi đầu tiên', icon: '🎯', conditionType: 'EXAM_COUNT', conditionValue: 1 },
    { id: 'ach-2', name: 'Chăm chỉ', description: 'Hoàn thành 10 bài thi', icon: '📚', conditionType: 'EXAM_COUNT', conditionValue: 10 },
    { id: 'ach-3', name: 'Xuất sắc', description: 'Đạt điểm 9+ trong một bài thi', icon: '⭐', conditionType: 'SCORE_TARGET', conditionValue: 9 },
    { id: 'ach-4', name: 'Bền bỉ', description: 'Học 7 ngày liên tiếp', icon: '🔥', conditionType: 'STUDY_DAYS', conditionValue: 7 },
    { id: 'ach-5', name: 'Toán học', description: 'Trả lời đúng 50 câu Toán', icon: '📐', conditionType: 'CORRECT_STREAK', conditionValue: 50 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({ where: { id: ach.id }, update: {}, create: ach });
  }

  // Create 50 sample questions for Toán 9
  const questionData = [
    { content: 'Giải phương trình: $x^2 - 5x + 6 = 0$', topicId: 'topic-ptbc2', difficulty: 'EASY', explanation: 'Phân tích: $(x-2)(x-3) = 0$, suy ra $x = 2$ hoặc $x = 3$', options: [{ key: 'A', content: '$x = 1$ hoặc $x = 6$', correct: false }, { key: 'B', content: '$x = 2$ hoặc $x = 3$', correct: true }, { key: 'C', content: '$x = -2$ hoặc $x = -3$', correct: false }, { key: 'D', content: '$x = -1$ hoặc $x = -6$', correct: false }] },
    { content: 'Tính giá trị của $\\Delta = b^2 - 4ac$ với $a=1, b=-3, c=2$', topicId: 'topic-ptbc2', difficulty: 'EASY', explanation: '$\\Delta = (-3)^2 - 4 \\cdot 1 \\cdot 2 = 9 - 8 = 1$', options: [{ key: 'A', content: '$\\Delta = 1$', correct: true }, { key: 'B', content: '$\\Delta = -1$', correct: false }, { key: 'C', content: '$\\Delta = 17$', correct: false }, { key: 'D', content: '$\\Delta = 0$', correct: false }] },
    { content: 'Phương trình $x^2 + 4x + 4 = 0$ có bao nhiêu nghiệm?', topicId: 'topic-ptbc2', difficulty: 'EASY', explanation: '$\\Delta = 16 - 16 = 0$, phương trình có nghiệm kép $x = -2$', options: [{ key: 'A', content: 'Không có nghiệm', correct: false }, { key: 'B', content: 'Một nghiệm kép', correct: true }, { key: 'C', content: 'Hai nghiệm phân biệt', correct: false }, { key: 'D', content: 'Vô số nghiệm', correct: false }] },
    { content: 'Giải hệ phương trình: $\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$', topicId: 'topic-hpt', difficulty: 'EASY', explanation: 'Cộng hai phương trình: $2x = 6 \\Rightarrow x = 3$, suy ra $y = 2$', options: [{ key: 'A', content: '$x = 2, y = 3$', correct: false }, { key: 'B', content: '$x = 3, y = 2$', correct: true }, { key: 'C', content: '$x = 4, y = 1$', correct: false }, { key: 'D', content: '$x = 1, y = 4$', correct: false }] },
    { content: 'Hàm số $y = 2x - 3$ đi qua điểm nào sau đây?', topicId: 'topic-hso', difficulty: 'EASY', explanation: 'Thử điểm $(1; -1)$: $y = 2(1) - 3 = -1$ ✓', options: [{ key: 'A', content: '$(0; 3)$', correct: false }, { key: 'B', content: '$(1; -1)$', correct: true }, { key: 'C', content: '$(2; 5)$', correct: false }, { key: 'D', content: '$(3; 9)$', correct: false }] },
    { content: 'Diện tích hình tròn có bán kính $r = 5$ cm là:', topicId: 'topic-hhoc', difficulty: 'EASY', explanation: '$S = \\pi r^2 = 25\\pi \\approx 78.54$ cm²', options: [{ key: 'A', content: '$10\\pi$ cm²', correct: false }, { key: 'B', content: '$25\\pi$ cm²', correct: true }, { key: 'C', content: '$50\\pi$ cm²', correct: false }, { key: 'D', content: '$100\\pi$ cm²', correct: false }] },
    { content: 'Căn bậc hai của $\\sqrt{144}$ bằng:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$\\sqrt{144} = 12$ vì $12^2 = 144$', options: [{ key: 'A', content: '11', correct: false }, { key: 'B', content: '12', correct: true }, { key: 'C', content: '13', correct: false }, { key: 'D', content: '14', correct: false }] },
    { content: 'Tổng các nghiệm của phương trình $x^2 - 7x + 12 = 0$ bằng:', topicId: 'topic-ptbc2', difficulty: 'MEDIUM', explanation: 'Theo Vieta: $x_1 + x_2 = -\\frac{b}{a} = 7$', options: [{ key: 'A', content: '5', correct: false }, { key: 'B', content: '6', correct: false }, { key: 'C', content: '7', correct: true }, { key: 'D', content: '12', correct: false }] },
    { content: 'Tích các nghiệm của phương trình $2x^2 - 5x + 3 = 0$ bằng:', topicId: 'topic-ptbc2', difficulty: 'MEDIUM', explanation: 'Theo Vieta: $x_1 \\cdot x_2 = \\frac{c}{a} = \\frac{3}{2}$', options: [{ key: 'A', content: '$\\frac{3}{2}$', correct: true }, { key: 'B', content: '$\\frac{5}{2}$', correct: false }, { key: 'C', content: '$-\\frac{3}{2}$', correct: false }, { key: 'D', content: '$3$', correct: false }] },
    { content: 'Giải hệ phương trình: $\\begin{cases} 2x + 3y = 7 \\\\ x - y = 1 \\end{cases}$', topicId: 'topic-hpt', difficulty: 'MEDIUM', explanation: 'Từ PT2: $x = y + 1$. Thế vào PT1: $2(y+1) + 3y = 7 \\Rightarrow 5y = 5 \\Rightarrow y = 1, x = 2$', options: [{ key: 'A', content: '$x = 1, y = 2$', correct: false }, { key: 'B', content: '$x = 2, y = 1$', correct: true }, { key: 'C', content: '$x = 3, y = 0$', correct: false }, { key: 'D', content: '$x = 0, y = 3$', correct: false }] },
    { content: 'Đường thẳng $y = kx + b$ song song với $y = 3x - 1$ khi:', topicId: 'topic-hso', difficulty: 'MEDIUM', explanation: 'Song song khi cùng hệ số góc: $k = 3$ và $b \\neq -1$', options: [{ key: 'A', content: '$k = 3, b = -1$', correct: false }, { key: 'B', content: '$k = 3, b \\neq -1$', correct: true }, { key: 'C', content: '$k = -3, b = 1$', correct: false }, { key: 'D', content: '$k \\neq 3, b = -1$', correct: false }] },
    { content: 'Trong tam giác vuông, nếu hai cạnh góc vuông là $3$ và $4$, thì cạnh huyền là:', topicId: 'topic-hhoc', difficulty: 'EASY', explanation: 'Theo Pytago: $c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$', options: [{ key: 'A', content: '5', correct: true }, { key: 'B', content: '6', correct: false }, { key: 'C', content: '7', correct: false }, { key: 'D', content: '$\\sqrt{7}$', correct: false }] },
    { content: 'Giá trị của $\\sqrt{2} \\cdot \\sqrt{8}$ bằng:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$\\sqrt{2} \\cdot \\sqrt{8} = \\sqrt{16} = 4$', options: [{ key: 'A', content: '2', correct: false }, { key: 'B', content: '3', correct: false }, { key: 'C', content: '4', correct: true }, { key: 'D', content: '6', correct: false }] },
    { content: 'Phương trình $3x^2 + x - 2 = 0$ có nghiệm là:', topicId: 'topic-ptbc2', difficulty: 'MEDIUM', explanation: '$\\Delta = 1 + 24 = 25$. Nghiệm: $x_1 = \\frac{-1+5}{6} = \\frac{2}{3}$, $x_2 = \\frac{-1-5}{6} = -1$', options: [{ key: 'A', content: '$x = \\frac{2}{3}$ hoặc $x = -1$', correct: true }, { key: 'B', content: '$x = -\\frac{2}{3}$ hoặc $x = 1$', correct: false }, { key: 'C', content: '$x = \\frac{1}{3}$ hoặc $x = -2$', correct: false }, { key: 'D', content: '$x = \\frac{3}{2}$ hoặc $x = 1$', correct: false }] },
    { content: 'Số trung bình cộng của $5, 7, 9, 11, 13$ là:', topicId: 'topic-xs', difficulty: 'EASY', explanation: 'Trung bình = $\\frac{5+7+9+11+13}{5} = \\frac{45}{5} = 9$', options: [{ key: 'A', content: '8', correct: false }, { key: 'B', content: '9', correct: true }, { key: 'C', content: '10', correct: false }, { key: 'D', content: '11', correct: false }] },
    { content: 'Rút gọn $\\frac{\\sqrt{50}}{\\sqrt{2}}$ bằng:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$\\frac{\\sqrt{50}}{\\sqrt{2}} = \\sqrt{\\frac{50}{2}} = \\sqrt{25} = 5$', options: [{ key: 'A', content: '4', correct: false }, { key: 'B', content: '5', correct: true }, { key: 'C', content: '6', correct: false }, { key: 'D', content: '$5\\sqrt{2}$', correct: false }] },
    { content: 'Tìm $x$ biết $x^2 = 9$:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$x^2 = 9 \\Rightarrow x = \\pm 3$', options: [{ key: 'A', content: '$x = 3$', correct: false }, { key: 'B', content: '$x = -3$', correct: false }, { key: 'C', content: '$x = \\pm 3$', correct: true }, { key: 'D', content: '$x = \\pm 9$', correct: false }] },
    { content: 'Đồ thị hàm số $y = x^2$ có đỉnh tại:', topicId: 'topic-hso', difficulty: 'EASY', explanation: 'Hàm số $y = x^2$ có đỉnh tại gốc tọa độ $O(0; 0)$', options: [{ key: 'A', content: '$(1; 1)$', correct: false }, { key: 'B', content: '$(0; 1)$', correct: false }, { key: 'C', content: '$(0; 0)$', correct: true }, { key: 'D', content: '$(1; 0)$', correct: false }] },
    { content: 'Chu vi hình tròn có đường kính $d = 10$ cm là:', topicId: 'topic-hhoc', difficulty: 'EASY', explanation: '$C = \\pi d = 10\\pi$ cm', options: [{ key: 'A', content: '$5\\pi$ cm', correct: false }, { key: 'B', content: '$10\\pi$ cm', correct: true }, { key: 'C', content: '$20\\pi$ cm', correct: false }, { key: 'D', content: '$25\\pi$ cm', correct: false }] },
    { content: 'Nếu $\\tan A = \\frac{3}{4}$ và $A$ là góc nhọn, thì $\\sin A$ bằng:', topicId: 'topic-hhoc', difficulty: 'HARD', explanation: 'Cạnh đối = 3, cạnh kề = 4, huyền = 5. $\\sin A = \\frac{3}{5}$', options: [{ key: 'A', content: '$\\frac{3}{5}$', correct: true }, { key: 'B', content: '$\\frac{4}{5}$', correct: false }, { key: 'C', content: '$\\frac{3}{4}$', correct: false }, { key: 'D', content: '$\\frac{4}{3}$', correct: false }] },
    { content: 'Giải phương trình: $2x^2 - 8 = 0$', topicId: 'topic-ptbc2', difficulty: 'EASY', explanation: '$2x^2 = 8 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$', options: [{ key: 'A', content: '$x = 2$', correct: false }, { key: 'B', content: '$x = -2$', correct: false }, { key: 'C', content: '$x = \\pm 2$', correct: true }, { key: 'D', content: '$x = \\pm 4$', correct: false }] },
    { content: 'Hệ số góc của đường thẳng đi qua hai điểm $(1; 2)$ và $(3; 6)$ là:', topicId: 'topic-hso', difficulty: 'MEDIUM', explanation: '$k = \\frac{6-2}{3-1} = \\frac{4}{2} = 2$', options: [{ key: 'A', content: '1', correct: false }, { key: 'B', content: '2', correct: true }, { key: 'C', content: '3', correct: false }, { key: 'D', content: '4', correct: false }] },
    { content: 'Diện tích tam giác có cạnh đáy $6$ cm và chiều cao $4$ cm là:', topicId: 'topic-hhoc', difficulty: 'EASY', explanation: '$S = \\frac{1}{2} \\cdot 6 \\cdot 4 = 12$ cm²', options: [{ key: 'A', content: '10 cm²', correct: false }, { key: 'B', content: '12 cm²', correct: true }, { key: 'C', content: '24 cm²', correct: false }, { key: 'D', content: '48 cm²', correct: false }] },
    { content: 'Phương trình nào sau đây có $\\Delta < 0$?', topicId: 'topic-ptbc2', difficulty: 'MEDIUM', explanation: '$x^2 + x + 1 = 0$: $\\Delta = 1 - 4 = -3 < 0$', options: [{ key: 'A', content: '$x^2 - 4 = 0$', correct: false }, { key: 'B', content: '$x^2 + 2x + 1 = 0$', correct: false }, { key: 'C', content: '$x^2 + x + 1 = 0$', correct: true }, { key: 'D', content: '$x^2 - 2x - 3 = 0$', correct: false }] },
    { content: 'Giải hệ phương trình: $\\begin{cases} x + 2y = 4 \\\\ 3x - y = 5 \\end{cases}$', topicId: 'topic-hpt', difficulty: 'MEDIUM', explanation: 'Từ PT1: $x = 4 - 2y$. Thế vào PT2: $3(4-2y) - y = 5 \\Rightarrow 12 - 7y = 5 \\Rightarrow y = 1, x = 2$', options: [{ key: 'A', content: '$x = 2, y = 1$', correct: true }, { key: 'B', content: '$x = 1, y = 2$', correct: false }, { key: 'C', content: '$x = 3, y = 0$', correct: false }, { key: 'D', content: '$x = 0, y = 2$', correct: false }] },
    { content: 'Giá trị của $\\sqrt{3} \\cdot \\sqrt{12}$ bằng:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$\\sqrt{3} \\cdot \\sqrt{12} = \\sqrt{36} = 6$', options: [{ key: 'A', content: '4', correct: false }, { key: 'B', content: '5', correct: false }, { key: 'C', content: '6', correct: true }, { key: 'D', content: '8', correct: false }] },
    { content: 'Rút gọn $(\\sqrt{5} + \\sqrt{3})(\\sqrt{5} - \\sqrt{3})$:', topicId: 'topic-dso', difficulty: 'MEDIUM', explanation: '$(\\sqrt{5})^2 - (\\sqrt{3})^2 = 5 - 3 = 2$', options: [{ key: 'A', content: '1', correct: false }, { key: 'B', content: '2', correct: true }, { key: 'C', content: '3', correct: false }, { key: 'D', content: '$2\\sqrt{15}$', correct: false }] },
    { content: 'Phương trình $x^2 - 2\\sqrt{3}x + 3 = 0$ có nghiệm là:', topicId: 'topic-ptbc2', difficulty: 'MEDIUM', explanation: '$\\Delta = 12 - 12 = 0$. Nghiệm kép: $x = \\sqrt{3}$', options: [{ key: 'A', content: '$x = \\sqrt{3}$ (nghiệm kép)', correct: true }, { key: 'B', content: '$x = \\pm\\sqrt{3}$', correct: false }, { key: 'C', content: '$x = 3$', correct: false }, { key: 'D', content: 'Vô nghiệm', correct: false }] },
    { content: 'Trong tam giác $ABC$ vuông tại $A$, nếu $BC = 10$, $AB = 6$, thì $AC$ bằng:', topicId: 'topic-hhoc', difficulty: 'MEDIUM', explanation: '$AC = \\sqrt{BC^2 - AB^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$', options: [{ key: 'A', content: '6', correct: false }, { key: 'B', content: '7', correct: false }, { key: 'C', content: '8', correct: true }, { key: 'D', content: '9', correct: false }] },
    { content: 'Hàm số $y = ax^2$ ($a \\neq 0$) có đồ thị là:', topicId: 'topic-hso', difficulty: 'EASY', explanation: 'Hàm bậc hai có đồ thị là một parabol với đỉnh tại gốc tọa độ', options: [{ key: 'A', content: 'Đường thẳng', correct: false }, { key: 'B', content: 'Đường tròn', correct: false }, { key: 'C', content: 'Parabol', correct: true }, { key: 'D', content: 'Hypebol', correct: false }] },
    { content: 'Tổ hợp chập 2 của 5 phần tử $C_5^2$ bằng:', topicId: 'topic-xs', difficulty: 'MEDIUM', explanation: '$C_5^2 = \\frac{5!}{2! \\cdot 3!} = \\frac{5 \\cdot 4}{2} = 10$', options: [{ key: 'A', content: '8', correct: false }, { key: 'B', content: '10', correct: true }, { key: 'C', content: '12', correct: false }, { key: 'D', content: '20', correct: false }] },
    { content: 'Khai triển $(x + 2)^2$ bằng:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$(x+2)^2 = x^2 + 4x + 4$', options: [{ key: 'A', content: '$x^2 + 4$', correct: false }, { key: 'B', content: '$x^2 + 2x + 4$', correct: false }, { key: 'C', content: '$x^2 + 4x + 4$', correct: true }, { key: 'D', content: '$x^2 - 4x + 4$', correct: false }] },
    { content: 'Cho $a = 2, b = -3, c = 1$. Giá trị $a^2 - b^2 + c^2$ bằng:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$4 - 9 + 1 = -4$', options: [{ key: 'A', content: '-4', correct: true }, { key: 'B', content: '4', correct: false }, { key: 'C', content: '6', correct: false }, { key: 'D', content: '-6', correct: false }] },
    { content: 'Biết $x_1, x_2$ là nghiệm của $x^2 - 5x + 6 = 0$. Tính $x_1^2 + x_2^2$:', topicId: 'topic-ptbc2', difficulty: 'HARD', explanation: '$x_1 + x_2 = 5$, $x_1 x_2 = 6$. $x_1^2 + x_2^2 = (x_1+x_2)^2 - 2x_1x_2 = 25 - 12 = 13$', options: [{ key: 'A', content: '12', correct: false }, { key: 'B', content: '13', correct: true }, { key: 'C', content: '14', correct: false }, { key: 'D', content: '25', correct: false }] },
    { content: 'Phân tích $x^2 - 9$ thành nhân tử:', topicId: 'topic-dso', difficulty: 'EASY', explanation: '$x^2 - 9 = (x-3)(x+3)$', options: [{ key: 'A', content: '$(x-3)^2$', correct: false }, { key: 'B', content: '$(x+3)^2$', correct: false }, { key: 'C', content: '$(x-3)(x+3)$', correct: true }, { key: 'D', content: '$(x-9)(x+1)$', correct: false }] },
    { content: 'Hàm số $y = 2x + 1$ đồng biến khi:', topicId: 'topic-hso', difficulty: 'EASY', explanation: 'Hệ số góc $k = 2 > 0$ nên hàm luôn đồng biến trên $\\mathbb{R}$', options: [{ key: 'A', content: '$x > 0$', correct: false }, { key: 'B', content: '$x > -1$', correct: false }, { key: 'C', content: 'Mọi $x \\in \\mathbb{R}$', correct: true }, { key: 'D', content: '$x > 1$', correct: false }] },
    { content: 'Góc nội tiếp chắn nửa đường tròn có số đo là:', topicId: 'topic-hhoc', difficulty: 'MEDIUM', explanation: 'Góc nội tiếp chắn nửa đường tròn (đường kính) bằng 90°', options: [{ key: 'A', content: '45°', correct: false }, { key: 'B', content: '60°', correct: false }, { key: 'C', content: '90°', correct: true }, { key: 'D', content: '180°', correct: false }] },
    { content: 'Giá trị của biểu thức $\\frac{1}{1 + \\sqrt{2}} + \\frac{1}{\\sqrt{2} + \\sqrt{3}}$ bằng:', topicId: 'topic-dso', difficulty: 'HARD', explanation: 'Hữu tỉ hóa: $\\frac{\\sqrt{2}-1}{1} + \\frac{\\sqrt{3}-\\sqrt{2}}{1} = \\sqrt{3} - 1$', options: [{ key: 'A', content: '$\\sqrt{3} - 1$', correct: true }, { key: 'B', content: '$\\sqrt{3} + 1$', correct: false }, { key: 'C', content: '$\\sqrt{2} - 1$', correct: false }, { key: 'D', content: '$2\\sqrt{2} - 1$', correct: false }] },
    { content: 'Cho tam giác có ba cạnh $5, 12, 13$. Tam giác đó là:', topicId: 'topic-hhoc', difficulty: 'MEDIUM', explanation: '$5^2 + 12^2 = 25 + 144 = 169 = 13^2$, nên đây là tam giác vuông', options: [{ key: 'A', content: 'Tam giác nhọn', correct: false }, { key: 'B', content: 'Tam giác vuông', correct: true }, { key: 'C', content: 'Tam giác tù', correct: false }, { key: 'D', content: 'Tam giác đều', correct: false }] },
    { content: 'Tìm $m$ để phương trình $x^2 - 2mx + m + 2 = 0$ có hai nghiệm dương:', topicId: 'topic-ptbc2', difficulty: 'VERY_HARD', explanation: 'Cần: $\\Delta \\geq 0$, $S = 2m > 0$, $P = m+2 > 0$. Giải ra $m \\geq 2$', options: [{ key: 'A', content: '$m > 0$', correct: false }, { key: 'B', content: '$m \\geq 2$', correct: true }, { key: 'C', content: '$m > -2$', correct: false }, { key: 'D', content: '$m \\geq 0$', correct: false }] },
    { content: 'Giá trị lớn nhất của hàm số $y = -x^2 + 4x - 3$ là:', topicId: 'topic-hso', difficulty: 'HARD', explanation: '$y = -(x-2)^2 + 1$. Giá trị lớn nhất là $1$ khi $x = 2$', options: [{ key: 'A', content: '$-3$', correct: false }, { key: 'B', content: '$0$', correct: false }, { key: 'C', content: '$1$', correct: true }, { key: 'D', content: '$4$', correct: false }] },
    { content: 'Xác suất tung đồng xu được mặt ngửa là:', topicId: 'topic-xs', difficulty: 'EASY', explanation: 'Có 2 kết quả đồng khả năng, 1 kết quả thuận lợi. P = 1/2', options: [{ key: 'A', content: '$\\frac{1}{4}$', correct: false }, { key: 'B', content: '$\\frac{1}{3}$', correct: false }, { key: 'C', content: '$\\frac{1}{2}$', correct: true }, { key: 'D', content: '$1$', correct: false }] },
    { content: 'Rút gọn $\\sqrt{(x-3)^2}$ khi $x < 3$:', topicId: 'topic-dso', difficulty: 'MEDIUM', explanation: 'Khi $x < 3$, $x - 3 < 0$, nên $\\sqrt{(x-3)^2} = |x-3| = 3-x$', options: [{ key: 'A', content: '$x - 3$', correct: false }, { key: 'B', content: '$3 - x$', correct: true }, { key: 'C', content: '$|x| - 3$', correct: false }, { key: 'D', content: '$(x-3)^2$', correct: false }] },
    { content: 'Cho $f(x) = x^2 - 3x + 2$. Giá trị $f(2)$ bằng:', topicId: 'topic-hso', difficulty: 'EASY', explanation: '$f(2) = 4 - 6 + 2 = 0$', options: [{ key: 'A', content: '-1', correct: false }, { key: 'B', content: '0', correct: true }, { key: 'C', content: '1', correct: false }, { key: 'D', content: '2', correct: false }] },
    { content: 'Diện tích hình thang có hai đáy $8$ và $12$, chiều cao $5$ là:', topicId: 'topic-hhoc', difficulty: 'EASY', explanation: '$S = \\frac{(8+12) \\cdot 5}{2} = \\frac{100}{2} = 50$', options: [{ key: 'A', content: '40', correct: false }, { key: 'B', content: '45', correct: false }, { key: 'C', content: '50', correct: true }, { key: 'D', content: '60', correct: false }] },
    { content: 'Giải bất phương trình $x^2 - 4 < 0$:', topicId: 'topic-dso', difficulty: 'MEDIUM', explanation: '$x^2 < 4 \\Leftrightarrow -2 < x < 2$', options: [{ key: 'A', content: '$x > 2$', correct: false }, { key: 'B', content: '$x < -2$', correct: false }, { key: 'C', content: '$-2 < x < 2$', correct: true }, { key: 'D', content: '$x > -2$', correct: false }] },
    { content: 'Phương trình $ax^2 + bx + c = 0$ ($a \\neq 0$) vô nghiệm khi:', topicId: 'topic-ptbc2', difficulty: 'EASY', explanation: 'Phương trình vô nghiệm khi $\\Delta = b^2 - 4ac < 0$', options: [{ key: 'A', content: '$\\Delta > 0$', correct: false }, { key: 'B', content: '$\\Delta = 0$', correct: false }, { key: 'C', content: '$\\Delta < 0$', correct: true }, { key: 'D', content: '$\\Delta \\geq 0$', correct: false }] },
    { content: 'Số trung vị của dãy số $2, 4, 6, 8, 10$ là:', topicId: 'topic-xs', difficulty: 'EASY', explanation: 'Dãy đã sắp xếp, phần tử giữa (thứ 3) là 6', options: [{ key: 'A', content: '4', correct: false }, { key: 'B', content: '5', correct: false }, { key: 'C', content: '6', correct: true }, { key: 'D', content: '8', correct: false }] },
    { content: 'Tổng $1 + 2 + 3 + ... + n = ?$', topicId: 'topic-dso', difficulty: 'MEDIUM', explanation: 'Công thức tổng cấp số cộng: $S = \\frac{n(n+1)}{2}$', options: [{ key: 'A', content: '$\\frac{n^2}{2}$', correct: false }, { key: 'B', content: '$\\frac{n(n+1)}{2}$', correct: true }, { key: 'C', content: '$n^2$', correct: false }, { key: 'D', content: '$n(n-1)$', correct: false }] },
    { content: 'Cho hệ phương trình $\\begin{cases} ax + y = 1 \\\\ x + ay = 1 \\end{cases}$ có nghiệm duy nhất khi:', topicId: 'topic-hpt', difficulty: 'HARD', explanation: 'Hệ có nghiệm duy nhất khi $\\det \\neq 0$: $a^2 \\neq 1 \\Rightarrow a \\neq \\pm 1$', options: [{ key: 'A', content: '$a = 1$', correct: false }, { key: 'B', content: '$a = -1$', correct: false }, { key: 'C', content: '$a \\neq \\pm 1$', correct: true }, { key: 'D', content: '$a \\neq 0$', correct: false }] },
  ];

  // Insert questions
  const questionIds: string[] = [];
  for (let i = 0; i < questionData.length; i++) {
    const q = questionData[i];
    const qId = `q-toan9-${i + 1}`;
    questionIds.push(qId);

    await prisma.question.upsert({
      where: { id: qId },
      update: {},
      create: {
        id: qId,
        subjectId: 'sub-toan',
        gradeId: 'grade-9',
        topicId: q.topicId,
        content: q.content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: q.difficulty,
        explanation: q.explanation,
        createdById: 'user-teacher',
        status: 'ACTIVE',
      },
    });

    for (let j = 0; j < q.options.length; j++) {
      const opt = q.options[j];
      await prisma.questionOption.upsert({
        where: { id: `${qId}-opt-${opt.key}` },
        update: {},
        create: {
          id: `${qId}-opt-${opt.key}`,
          questionId: qId,
          optionKey: opt.key,
          content: opt.content,
          isCorrect: opt.correct,
          sortOrder: j,
        },
      });
    }
  }

  // Create 3 Exams
  const exam1 = await prisma.exam.upsert({
    where: { id: 'exam-1' },
    update: {},
    create: {
      id: 'exam-1',
      title: 'Đề kiểm tra Toán 9 - Phương trình bậc hai',
      description: 'Kiểm tra kiến thức về phương trình bậc hai và hệ phương trình',
      subjectId: 'sub-toan',
      gradeId: 'grade-9',
      durationMinutes: 45,
      totalQuestions: 20,
      maxScore: 10,
      difficulty: 'MEDIUM',
      examType: 'PRACTICE',
      createdById: 'user-teacher',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  const exam2 = await prisma.exam.upsert({
    where: { id: 'exam-2' },
    update: {},
    create: {
      id: 'exam-2',
      title: 'Đề kiểm tra Toán 9 - Hình học phẳng',
      description: 'Kiểm tra kiến thức về hình học và trigonometry lớp 9',
      subjectId: 'sub-toan',
      gradeId: 'grade-9',
      durationMinutes: 45,
      totalQuestions: 15,
      maxScore: 10,
      difficulty: 'HARD',
      examType: 'MOCK_EXAM',
      createdById: 'user-teacher',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  const exam3 = await prisma.exam.upsert({
    where: { id: 'exam-3' },
    update: {},
    create: {
      id: 'exam-3',
      title: 'Đề thi thử Toán 9 - Tổng hợp cuối năm',
      description: 'Đề thi thử tổng hợp toàn bộ chương trình Toán 9',
      subjectId: 'sub-toan',
      gradeId: 'grade-9',
      durationMinutes: 90,
      totalQuestions: 40,
      maxScore: 10,
      difficulty: 'MEDIUM',
      examType: 'OFFICIAL',
      createdById: 'user-teacher',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  // Assign questions to exams
  const firstIds = questionIds.slice(0, 20);
  for (let i = 0; i < firstIds.length; i++) {
    await prisma.examQuestion.upsert({
      where: { examId_questionId: { examId: 'exam-1', questionId: firstIds[i] } },
      update: {},
      create: { examId: 'exam-1', questionId: firstIds[i], questionOrder: i + 1, points: 0.5 },
    });
  }

  const geomIds = questionIds.filter((_, i) => [5, 11, 18, 27, 29, 35, 37, 39, 43, 45, 46, 47, 48, 49, 6].includes(i));
  const geomSlice = geomIds.slice(0, 15);
  for (let i = 0; i < geomSlice.length; i++) {
    await prisma.examQuestion.upsert({
      where: { examId_questionId: { examId: 'exam-2', questionId: geomSlice[i] } },
      update: {},
      create: { examId: 'exam-2', questionId: geomSlice[i], questionOrder: i + 1, points: 0.67 },
    });
  }

  for (let i = 0; i < Math.min(40, questionIds.length); i++) {
    await prisma.examQuestion.upsert({
      where: { examId_questionId: { examId: 'exam-3', questionId: questionIds[i] } },
      update: {},
      create: { examId: 'exam-3', questionId: questionIds[i], questionOrder: i + 1, points: 0.25 },
    });
  }

  // Create sample attempts for student
  const attempt1 = await prisma.attempt.upsert({
    where: { id: 'attempt-1' },
    update: {},
    create: {
      id: 'attempt-1',
      examId: 'exam-1',
      studentId: 'student-1',
      startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      submittedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 40 * 60 * 1000),
      status: 'SUBMITTED',
      score: 8.5,
      correctCount: 17,
      wrongCount: 3,
      blankCount: 0,
      timeSpentSeconds: 2400,
    },
  });

  // Grant achievement
  await prisma.studentAchievement.upsert({
    where: { studentId_achievementId: { studentId: 'student-1', achievementId: 'ach-1' } },
    update: {},
    create: { studentId: 'student-1', achievementId: 'ach-1' },
  });

  // ── Toán lớp 5 ──────────────────────────────────────────────────────────
  const toan5Data = [
    // Số tự nhiên và phân số
    { content: 'Số tự nhiên lớn nhất có 3 chữ số là:', topicId: 'topic5-so', difficulty: 'EASY', explanation: 'Số tự nhiên lớn nhất có 3 chữ số là 999.', options: [{ key: 'A', content: '900', correct: false }, { key: 'B', content: '990', correct: false }, { key: 'C', content: '999', correct: true }, { key: 'D', content: '1000', correct: false }] },
    { content: 'Số nào sau đây chia hết cho cả 2 và 5?', topicId: 'topic5-so', difficulty: 'EASY', explanation: 'Số chia hết cho 2 và 5 phải tận cùng bằng 0. Đó là 120.', options: [{ key: 'A', content: '115', correct: false }, { key: 'B', content: '120', correct: true }, { key: 'C', content: '125', correct: false }, { key: 'D', content: '135', correct: false }] },
    { content: 'ƯCLN của 12 và 18 là:', topicId: 'topic5-so', difficulty: 'EASY', explanation: 'Các ước của 12: 1,2,3,4,6,12. Ước của 18: 1,2,3,6,9,18. ƯCLN = 6.', options: [{ key: 'A', content: '3', correct: false }, { key: 'B', content: '4', correct: false }, { key: 'C', content: '6', correct: true }, { key: 'D', content: '9', correct: false }] },
    { content: 'BCNN của 4 và 6 là:', topicId: 'topic5-so', difficulty: 'EASY', explanation: 'BCNN(4,6) = 12 vì 12 là số nhỏ nhất chia hết cho cả 4 và 6.', options: [{ key: 'A', content: '8', correct: false }, { key: 'B', content: '10', correct: false }, { key: 'C', content: '12', correct: true }, { key: 'D', content: '24', correct: false }] },
    { content: 'Số nào sau đây là số nguyên tố?', topicId: 'topic5-so', difficulty: 'EASY', explanation: '7 là số nguyên tố vì chỉ chia hết cho 1 và chính nó.', options: [{ key: 'A', content: '4', correct: false }, { key: 'B', content: '6', correct: false }, { key: 'C', content: '7', correct: true }, { key: 'D', content: '9', correct: false }] },
    // Phân số
    { content: 'Phân số nào bằng $\\frac{2}{3}$?', topicId: 'topic5-phan-so', difficulty: 'EASY', explanation: '$\\frac{4}{6} = \\frac{2}{3}$ (chia cả tử và mẫu cho 2).', options: [{ key: 'A', content: '$\\frac{3}{4}$', correct: false }, { key: 'B', content: '$\\frac{4}{6}$', correct: true }, { key: 'C', content: '$\\frac{2}{5}$', correct: false }, { key: 'D', content: '$\\frac{3}{5}$', correct: false }] },
    { content: 'Rút gọn phân số $\\frac{12}{16}$:', topicId: 'topic5-phan-so', difficulty: 'EASY', explanation: 'ƯCLN(12,16) = 4. $\\frac{12}{16} = \\frac{3}{4}$.', options: [{ key: 'A', content: '$\\frac{2}{3}$', correct: false }, { key: 'B', content: '$\\frac{3}{4}$', correct: true }, { key: 'C', content: '$\\frac{4}{5}$', correct: false }, { key: 'D', content: '$\\frac{6}{8}$', correct: false }] },
    { content: '$\\frac{1}{2} + \\frac{1}{3}$ bằng:', topicId: 'topic5-phan-so', difficulty: 'EASY', explanation: 'Quy đồng mẫu số 6: $\\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$.', options: [{ key: 'A', content: '$\\frac{2}{5}$', correct: false }, { key: 'B', content: '$\\frac{5}{6}$', correct: true }, { key: 'C', content: '$\\frac{2}{6}$', correct: false }, { key: 'D', content: '$\\frac{1}{6}$', correct: false }] },
    { content: '$\\frac{3}{4} - \\frac{1}{4}$ bằng:', topicId: 'topic5-phan-so', difficulty: 'EASY', explanation: 'Cùng mẫu số: $\\frac{3-1}{4} = \\frac{2}{4} = \\frac{1}{2}$.', options: [{ key: 'A', content: '$\\frac{1}{4}$', correct: false }, { key: 'B', content: '$\\frac{1}{2}$', correct: true }, { key: 'C', content: '$\\frac{2}{3}$', correct: false }, { key: 'D', content: '$\\frac{3}{8}$', correct: false }] },
    { content: '$\\frac{2}{5} \\times \\frac{5}{6}$ bằng:', topicId: 'topic5-phan-so', difficulty: 'MEDIUM', explanation: '$\\frac{2 \\times 5}{5 \\times 6} = \\frac{10}{30} = \\frac{1}{3}$.', options: [{ key: 'A', content: '$\\frac{1}{3}$', correct: true }, { key: 'B', content: '$\\frac{2}{3}$', correct: false }, { key: 'C', content: '$\\frac{7}{11}$', correct: false }, { key: 'D', content: '$\\frac{10}{11}$', correct: false }] },
    { content: '$\\frac{3}{4} \\div \\frac{3}{8}$ bằng:', topicId: 'topic5-phan-so', difficulty: 'MEDIUM', explanation: '$\\frac{3}{4} \\times \\frac{8}{3} = \\frac{24}{12} = 2$.', options: [{ key: 'A', content: '$\\frac{9}{32}$', correct: false }, { key: 'B', content: '$\\frac{1}{2}$', correct: false }, { key: 'C', content: '$2$', correct: true }, { key: 'D', content: '$3$', correct: false }] },
    { content: 'So sánh: $\\frac{3}{5}$ ... $\\frac{2}{3}$', topicId: 'topic5-phan-so', difficulty: 'EASY', explanation: 'Quy đồng: $\\frac{9}{15}$ và $\\frac{10}{15}$. Vì $9 < 10$ nên $\\frac{3}{5} < \\frac{2}{3}$.', options: [{ key: 'A', content: '$\\frac{3}{5} > \\frac{2}{3}$', correct: false }, { key: 'B', content: '$\\frac{3}{5} = \\frac{2}{3}$', correct: false }, { key: 'C', content: '$\\frac{3}{5} < \\frac{2}{3}$', correct: true }, { key: 'D', content: 'Không so sánh được', correct: false }] },
    // Số thập phân
    { content: 'Số thập phân 3,45 đọc là:', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: '3,45 đọc là "ba phẩy bốn mươi lăm".', options: [{ key: 'A', content: 'Ba phẩy bốn năm', correct: false }, { key: 'B', content: 'Ba phẩy bốn mươi lăm', correct: true }, { key: 'C', content: 'Ba mươi bốn phẩy năm', correct: false }, { key: 'D', content: 'Ba trăm bốn mươi lăm', correct: false }] },
    { content: '0,7 + 0,3 = ?', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: '0,7 + 0,3 = 1,0 = 1.', options: [{ key: 'A', content: '0,10', correct: false }, { key: 'B', content: '1,0', correct: true }, { key: 'C', content: '0,37', correct: false }, { key: 'D', content: '1,1', correct: false }] },
    { content: '2,5 × 4 = ?', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: '2,5 × 4 = 10,0 = 10.', options: [{ key: 'A', content: '8,0', correct: false }, { key: 'B', content: '9,0', correct: false }, { key: 'C', content: '10,0', correct: true }, { key: 'D', content: '12,0', correct: false }] },
    { content: '5,4 ÷ 0,6 = ?', topicId: 'topic5-so-tp', difficulty: 'MEDIUM', explanation: '5,4 ÷ 0,6 = 54 ÷ 6 = 9.', options: [{ key: 'A', content: '0,9', correct: false }, { key: 'B', content: '9', correct: true }, { key: 'C', content: '90', correct: false }, { key: 'D', content: '0,09', correct: false }] },
    { content: 'Số thập phân nào lớn nhất?', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: 'So sánh: 2,9 > 2,85 > 2,8 > 2,09.', options: [{ key: 'A', content: '2,85', correct: false }, { key: 'B', content: '2,9', correct: true }, { key: 'C', content: '2,09', correct: false }, { key: 'D', content: '2,8', correct: false }] },
    { content: 'Viết $\\frac{7}{10}$ dưới dạng số thập phân:', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: '$\\frac{7}{10} = 0,7$.', options: [{ key: 'A', content: '7,0', correct: false }, { key: 'B', content: '0,07', correct: false }, { key: 'C', content: '0,7', correct: true }, { key: 'D', content: '70', correct: false }] },
    { content: 'Làm tròn 3,456 đến hàng phần trăm:', topicId: 'topic5-so-tp', difficulty: 'MEDIUM', explanation: 'Chữ số hàng phần nghìn là 6 ≥ 5, nên làm tròn lên: 3,46.', options: [{ key: 'A', content: '3,4', correct: false }, { key: 'B', content: '3,45', correct: false }, { key: 'C', content: '3,46', correct: true }, { key: 'D', content: '3,5', correct: false }] },
    { content: '12,6 - 4,8 = ?', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: '12,6 - 4,8 = 7,8.', options: [{ key: 'A', content: '7,2', correct: false }, { key: 'B', content: '7,8', correct: true }, { key: 'C', content: '8,2', correct: false }, { key: 'D', content: '8,8', correct: false }] },
    { content: '0,25 × 100 = ?', topicId: 'topic5-so-tp', difficulty: 'EASY', explanation: 'Nhân với 100 thì dịch dấu phẩy 2 chữ số sang phải: 0,25 × 100 = 25.', options: [{ key: 'A', content: '2,5', correct: false }, { key: 'B', content: '25', correct: true }, { key: 'C', content: '250', correct: false }, { key: 'D', content: '0,025', correct: false }] },
    // Đo lường
    { content: '3 km = ? m', topicId: 'topic5-do-luong', difficulty: 'EASY', explanation: '1 km = 1000 m, nên 3 km = 3000 m.', options: [{ key: 'A', content: '300 m', correct: false }, { key: 'B', content: '3000 m', correct: true }, { key: 'C', content: '30 m', correct: false }, { key: 'D', content: '30 000 m', correct: false }] },
    { content: '1 giờ 30 phút = ? phút', topicId: 'topic5-do-luong', difficulty: 'EASY', explanation: '1 giờ = 60 phút. 60 + 30 = 90 phút.', options: [{ key: 'A', content: '80 phút', correct: false }, { key: 'B', content: '90 phút', correct: true }, { key: 'C', content: '100 phút', correct: false }, { key: 'D', content: '130 phút', correct: false }] },
    { content: '2 tấn 5 tạ = ? kg', topicId: 'topic5-do-luong', difficulty: 'MEDIUM', explanation: '2 tấn = 2000 kg, 5 tạ = 500 kg. Tổng = 2500 kg.', options: [{ key: 'A', content: '205 kg', correct: false }, { key: 'B', content: '250 kg', correct: false }, { key: 'C', content: '2500 kg', correct: true }, { key: 'D', content: '25 000 kg', correct: false }] },
    { content: '5000 ml = ? lít', topicId: 'topic5-do-luong', difficulty: 'EASY', explanation: '1 lít = 1000 ml. 5000 ml = 5 lít.', options: [{ key: 'A', content: '0,5 lít', correct: false }, { key: 'B', content: '50 lít', correct: false }, { key: 'C', content: '5 lít', correct: true }, { key: 'D', content: '500 lít', correct: false }] },
    { content: '1 năm có bao nhiêu ngày (năm thường)?', topicId: 'topic5-do-luong', difficulty: 'EASY', explanation: 'Năm thường có 365 ngày.', options: [{ key: 'A', content: '360 ngày', correct: false }, { key: 'B', content: '364 ngày', correct: false }, { key: 'C', content: '365 ngày', correct: true }, { key: 'D', content: '366 ngày', correct: false }] },
    { content: '2,5 km = ? m', topicId: 'topic5-do-luong', difficulty: 'EASY', explanation: '2,5 km = 2500 m.', options: [{ key: 'A', content: '25 m', correct: false }, { key: 'B', content: '250 m', correct: false }, { key: 'C', content: '2500 m', correct: true }, { key: 'D', content: '25 000 m', correct: false }] },
    // Hình học
    { content: 'Diện tích hình chữ nhật dài 8 cm, rộng 5 cm là:', topicId: 'topic5-hinh-hoc', difficulty: 'EASY', explanation: 'S = dài × rộng = 8 × 5 = 40 cm².', options: [{ key: 'A', content: '13 cm²', correct: false }, { key: 'B', content: '26 cm²', correct: false }, { key: 'C', content: '40 cm²', correct: true }, { key: 'D', content: '45 cm²', correct: false }] },
    { content: 'Chu vi hình vuông cạnh 7 cm là:', topicId: 'topic5-hinh-hoc', difficulty: 'EASY', explanation: 'C = 4 × cạnh = 4 × 7 = 28 cm.', options: [{ key: 'A', content: '21 cm', correct: false }, { key: 'B', content: '28 cm', correct: true }, { key: 'C', content: '35 cm', correct: false }, { key: 'D', content: '49 cm', correct: false }] },
    { content: 'Diện tích hình tam giác có đáy 10 cm và chiều cao 6 cm là:', topicId: 'topic5-hinh-hoc', difficulty: 'EASY', explanation: 'S = (đáy × chiều cao) ÷ 2 = (10 × 6) ÷ 2 = 30 cm².', options: [{ key: 'A', content: '16 cm²', correct: false }, { key: 'B', content: '30 cm²', correct: true }, { key: 'C', content: '60 cm²', correct: false }, { key: 'D', content: '32 cm²', correct: false }] },
    { content: 'Diện tích hình thang có đáy lớn 12 cm, đáy bé 8 cm, chiều cao 5 cm là:', topicId: 'topic5-hinh-hoc', difficulty: 'MEDIUM', explanation: 'S = (đáy lớn + đáy bé) × chiều cao ÷ 2 = (12 + 8) × 5 ÷ 2 = 50 cm².', options: [{ key: 'A', content: '40 cm²', correct: false }, { key: 'B', content: '50 cm²', correct: true }, { key: 'C', content: '60 cm²', correct: false }, { key: 'D', content: '100 cm²', correct: false }] },
    { content: 'Diện tích hình tròn bán kính 7 cm (lấy π ≈ 3,14) là:', topicId: 'topic5-hinh-hoc', difficulty: 'MEDIUM', explanation: 'S = π × r² = 3,14 × 7² = 3,14 × 49 ≈ 153,86 cm².', options: [{ key: 'A', content: '43,96 cm²', correct: false }, { key: 'B', content: '153,86 cm²', correct: true }, { key: 'C', content: '21,98 cm²', correct: false }, { key: 'D', content: '307,72 cm²', correct: false }] },
    { content: 'Chu vi hình tròn đường kính 10 cm (lấy π ≈ 3,14) là:', topicId: 'topic5-hinh-hoc', difficulty: 'MEDIUM', explanation: 'C = π × d = 3,14 × 10 = 31,4 cm.', options: [{ key: 'A', content: '15,7 cm', correct: false }, { key: 'B', content: '31,4 cm', correct: true }, { key: 'C', content: '62,8 cm', correct: false }, { key: 'D', content: '314 cm', correct: false }] },
    { content: 'Thể tích hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm là:', topicId: 'topic5-hinh-hoc', difficulty: 'MEDIUM', explanation: 'V = dài × rộng × cao = 5 × 4 × 3 = 60 cm³.', options: [{ key: 'A', content: '47 cm³', correct: false }, { key: 'B', content: '60 cm³', correct: true }, { key: 'C', content: '12 cm³', correct: false }, { key: 'D', content: '120 cm³', correct: false }] },
    { content: 'Thể tích hình lập phương cạnh 4 cm là:', topicId: 'topic5-hinh-hoc', difficulty: 'MEDIUM', explanation: 'V = cạnh³ = 4³ = 64 cm³.', options: [{ key: 'A', content: '16 cm³', correct: false }, { key: 'B', content: '48 cm³', correct: false }, { key: 'C', content: '64 cm³', correct: true }, { key: 'D', content: '96 cm³', correct: false }] },
    // Toán có lời văn
    { content: 'Một cửa hàng có 240 kg gạo. Cửa hàng đã bán $\\frac{3}{4}$ số gạo đó. Hỏi cửa hàng đã bán bao nhiêu kg gạo?', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: '240 × $\\frac{3}{4}$ = 180 kg.', options: [{ key: 'A', content: '60 kg', correct: false }, { key: 'B', content: '120 kg', correct: false }, { key: 'C', content: '180 kg', correct: true }, { key: 'D', content: '320 kg', correct: false }] },
    { content: 'Một ô tô đi được 180 km trong 3 giờ. Hỏi mỗi giờ ô tô đi được bao nhiêu km?', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: 'Vận tốc = Quãng đường ÷ Thời gian = 180 ÷ 3 = 60 km/h.', options: [{ key: 'A', content: '40 km/h', correct: false }, { key: 'B', content: '50 km/h', correct: false }, { key: 'C', content: '60 km/h', correct: true }, { key: 'D', content: '90 km/h', correct: false }] },
    { content: 'Một lớp học có 36 học sinh, trong đó $\\frac{1}{3}$ là học sinh giỏi. Số học sinh giỏi là:', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: '36 ÷ 3 = 12 học sinh giỏi.', options: [{ key: 'A', content: '9', correct: false }, { key: 'B', content: '12', correct: true }, { key: 'C', content: '18', correct: false }, { key: 'D', content: '24', correct: false }] },
    { content: 'Hai vòi nước cùng chảy vào bể. Vòi A chảy đầy bể trong 6 giờ, vòi B trong 3 giờ. Hai vòi cùng chảy thì bao lâu đầy bể?', topicId: 'topic5-toan-co-van', difficulty: 'HARD', explanation: 'Mỗi giờ hai vòi chảy được $\\frac{1}{6} + \\frac{1}{3} = \\frac{1}{2}$ bể. Thời gian = 2 giờ.', options: [{ key: 'A', content: '1 giờ', correct: false }, { key: 'B', content: '2 giờ', correct: true }, { key: 'C', content: '3 giờ', correct: false }, { key: 'D', content: '4,5 giờ', correct: false }] },
    { content: 'Một hình chữ nhật có chu vi 28 cm. Chiều dài hơn chiều rộng 4 cm. Diện tích hình chữ nhật là:', topicId: 'topic5-toan-co-van', difficulty: 'MEDIUM', explanation: 'Nửa chu vi = 14. Chiều dài = (14+4)/2 = 9, chiều rộng = 5. Diện tích = 45 cm².', options: [{ key: 'A', content: '40 cm²', correct: false }, { key: 'B', content: '45 cm²', correct: true }, { key: 'C', content: '48 cm²', correct: false }, { key: 'D', content: '56 cm²', correct: false }] },
    { content: 'Một xe đạp đi với vận tốc 12 km/h. Sau 2,5 giờ xe đi được:', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: 'Quãng đường = vận tốc × thời gian = 12 × 2,5 = 30 km.', options: [{ key: 'A', content: '24 km', correct: false }, { key: 'B', content: '28 km', correct: false }, { key: 'C', content: '30 km', correct: true }, { key: 'D', content: '36 km', correct: false }] },
    { content: 'Mua 5 quyển vở hết 35 000 đồng. Hỏi mua 8 quyển vở hết bao nhiêu tiền?', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: 'Giá 1 vở = 35 000 ÷ 5 = 7 000 đ. Mua 8 vở = 7 000 × 8 = 56 000 đ.', options: [{ key: 'A', content: '42 000 đ', correct: false }, { key: 'B', content: '48 000 đ', correct: false }, { key: 'C', content: '56 000 đ', correct: true }, { key: 'D', content: '70 000 đ', correct: false }] },
    { content: 'Tỉ số phần trăm của 25 so với 200 là:', topicId: 'topic5-toan-co-van', difficulty: 'MEDIUM', explanation: '25 ÷ 200 × 100% = 12,5%.', options: [{ key: 'A', content: '8%', correct: false }, { key: 'B', content: '10%', correct: false }, { key: 'C', content: '12,5%', correct: true }, { key: 'D', content: '25%', correct: false }] },
    { content: 'Một mảnh vải dài 8 m. Người ta cắt đi $\\frac{3}{8}$ mảnh vải. Phần còn lại dài:', topicId: 'topic5-toan-co-van', difficulty: 'MEDIUM', explanation: 'Cắt đi: 8 × $\\frac{3}{8}$ = 3 m. Còn lại: 8 - 3 = 5 m.', options: [{ key: 'A', content: '3 m', correct: false }, { key: 'B', content: '4 m', correct: false }, { key: 'C', content: '5 m', correct: true }, { key: 'D', content: '6 m', correct: false }] },
    { content: 'Lớp 5A có 40 học sinh. Số học sinh nữ chiếm 55% số học sinh cả lớp. Số học sinh nam là:', topicId: 'topic5-toan-co-van', difficulty: 'MEDIUM', explanation: 'Số nữ = 40 × 55% = 22. Số nam = 40 - 22 = 18.', options: [{ key: 'A', content: '16', correct: false }, { key: 'B', content: '18', correct: true }, { key: 'C', content: '20', correct: false }, { key: 'D', content: '22', correct: false }] },
    { content: 'Một hồ bơi dài 50 m, rộng 20 m. Diện tích mặt nước hồ bơi là:', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: 'S = dài × rộng = 50 × 20 = 1000 m².', options: [{ key: 'A', content: '70 m²', correct: false }, { key: 'B', content: '700 m²', correct: false }, { key: 'C', content: '1000 m²', correct: true }, { key: 'D', content: '2000 m²', correct: false }] },
    { content: 'Một con tàu đi từ cảng A đến cảng B hết 4 giờ với vận tốc 35 km/h. Quãng đường AB dài:', topicId: 'topic5-toan-co-van', difficulty: 'EASY', explanation: 'Quãng đường = 35 × 4 = 140 km.', options: [{ key: 'A', content: '120 km', correct: false }, { key: 'B', content: '130 km', correct: false }, { key: 'C', content: '140 km', correct: true }, { key: 'D', content: '150 km', correct: false }] },
    { content: 'Bình có số tiền là 120 000 đồng. Bình mua sách hết $\\frac{2}{5}$ số tiền. Tiền còn lại là:', topicId: 'topic5-toan-co-van', difficulty: 'MEDIUM', explanation: 'Tiền mua sách = 120 000 × $\\frac{2}{5}$ = 48 000 đ. Còn lại = 120 000 - 48 000 = 72 000 đ.', options: [{ key: 'A', content: '48 000 đ', correct: false }, { key: 'B', content: '60 000 đ', correct: false }, { key: 'C', content: '72 000 đ', correct: true }, { key: 'D', content: '96 000 đ', correct: false }] },
  ];

  const toan5Ids: string[] = [];
  for (let i = 0; i < toan5Data.length; i++) {
    const q = toan5Data[i];
    const qId = `q-toan5-${i + 1}`;
    toan5Ids.push(qId);

    await prisma.question.upsert({
      where: { id: qId },
      update: {},
      create: {
        id: qId,
        subjectId: 'sub-toan',
        gradeId: 'grade-5',
        topicId: q.topicId,
        content: q.content,
        questionType: 'MULTIPLE_CHOICE',
        difficulty: q.difficulty,
        explanation: q.explanation,
        createdById: 'user-teacher',
        status: 'ACTIVE',
      },
    });

    for (let j = 0; j < q.options.length; j++) {
      const opt = q.options[j];
      await prisma.questionOption.upsert({
        where: { id: `${qId}-opt-${opt.key}` },
        update: {},
        create: {
          id: `${qId}-opt-${opt.key}`,
          questionId: qId,
          optionKey: opt.key,
          content: opt.content,
          isCorrect: opt.correct,
          sortOrder: j,
        },
      });
    }
  }

  // Tạo 2 đề thi Toán lớp 5
  await prisma.exam.upsert({
    where: { id: 'exam-toan5-1' },
    update: {},
    create: {
      id: 'exam-toan5-1',
      title: 'Đề kiểm tra Toán 5 - Số và Phân số',
      description: 'Kiểm tra kiến thức về số tự nhiên, phân số và số thập phân lớp 5',
      subjectId: 'sub-toan',
      gradeId: 'grade-5',
      durationMinutes: 45,
      totalQuestions: 20,
      maxScore: 10,
      difficulty: 'EASY',
      examType: 'PRACTICE',
      createdById: 'user-teacher',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  for (let i = 0; i < Math.min(20, toan5Ids.length); i++) {
    await prisma.examQuestion.upsert({
      where: { examId_questionId: { examId: 'exam-toan5-1', questionId: toan5Ids[i] } },
      update: {},
      create: { examId: 'exam-toan5-1', questionId: toan5Ids[i], questionOrder: i + 1, points: 0.5 },
    });
  }

  await prisma.exam.upsert({
    where: { id: 'exam-toan5-2' },
    update: {},
    create: {
      id: 'exam-toan5-2',
      title: 'Đề thi thử Toán 5 - Tổng hợp cuối năm',
      description: 'Đề thi thử tổng hợp toàn bộ chương trình Toán lớp 5',
      subjectId: 'sub-toan',
      gradeId: 'grade-5',
      durationMinutes: 60,
      totalQuestions: 40,
      maxScore: 10,
      difficulty: 'MEDIUM',
      examType: 'MOCK_EXAM',
      createdById: 'user-teacher',
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
  });

  for (let i = 0; i < Math.min(40, toan5Ids.length); i++) {
    await prisma.examQuestion.upsert({
      where: { examId_questionId: { examId: 'exam-toan5-2', questionId: toan5Ids[i] } },
      update: {},
      create: { examId: 'exam-toan5-2', questionId: toan5Ids[i], questionOrder: i + 1, points: 0.25 },
    });
  }

  console.log('Seeding complete!');
  console.log('Accounts:');
  console.log('  admin@exam.vn / Admin@123');
  console.log('  teacher@exam.vn / Teacher@123');
  console.log('  student@exam.vn / Student@123');
  console.log('  parent@exam.vn / Parent@123');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
