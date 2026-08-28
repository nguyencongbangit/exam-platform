export interface SchoolProgress {
  weekNum: number;       // tuần thứ mấy trong năm học (1-39)
  totalWeeks: number;    // tổng số tuần (39)
  percent: number;       // 0-1
  semester: 1 | 2;
  semesterWeek: number;  // tuần trong học kỳ hiện tại
  semesterTotalWeeks: number;
  label: string;         // "Học kỳ 1 - Tuần 10"
  schoolYear: string;    // "2025-2026"
  isSummer: boolean;
}

// Lịch năm học Việt Nam: bắt đầu 5/9, HK1 kết thúc ~15/1, HK2 kết thúc ~31/5
const HK1_WEEKS = 19; // ~19 tuần HK1
const HK2_WEEKS = 20; // ~20 tuần HK2
const TOTAL_WEEKS = HK1_WEEKS + HK2_WEEKS; // 39

export function getSchoolProgress(): SchoolProgress {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1; // 1-12

  // Xác định năm học hiện tại
  // Nếu tháng >= 9: năm học y/(y+1), bắt đầu 5/9/y
  // Nếu tháng < 9: năm học (y-1)/y, bắt đầu 5/9/(y-1)
  let startYear: number;
  if (m >= 9) {
    startYear = y;
  } else {
    startYear = y - 1;
  }

  const schoolStart = new Date(startYear, 8, 5);   // 5/9
  const hk1End     = new Date(startYear + 1, 0, 15); // 15/1
  const hk2Start   = new Date(startYear + 1, 0, 20); // 20/1
  const schoolEnd  = new Date(startYear + 1, 4, 31); // 31/5
  const schoolYear = `${startYear}-${startYear + 1}`;

  const msPerWeek = 7 * 24 * 3600 * 1000;

  // Mùa hè trước khi năm học bắt đầu
  if (now < schoolStart) {
    return {
      weekNum: TOTAL_WEEKS,
      totalWeeks: TOTAL_WEEKS,
      percent: 1,
      semester: 2,
      semesterWeek: HK2_WEEKS,
      semesterTotalWeeks: HK2_WEEKS,
      label: `Mùa hè — ôn tập năm học ${startYear - 1}-${startYear}`,
      schoolYear: `${startYear - 1}-${startYear}`,
      isSummer: true,
    };
  }

  // Sau khi năm học kết thúc (hè)
  if (now > schoolEnd) {
    return {
      weekNum: TOTAL_WEEKS,
      totalWeeks: TOTAL_WEEKS,
      percent: 1,
      semester: 2,
      semesterWeek: HK2_WEEKS,
      semesterTotalWeeks: HK2_WEEKS,
      label: `Mùa hè — ôn tập năm học ${schoolYear}`,
      schoolYear,
      isSummer: true,
    };
  }

  // Giữa HK1 và HK2 (nghỉ tết)
  if (now > hk1End && now < hk2Start) {
    return {
      weekNum: HK1_WEEKS,
      totalWeeks: TOTAL_WEEKS,
      percent: HK1_WEEKS / TOTAL_WEEKS,
      semester: 1,
      semesterWeek: HK1_WEEKS,
      semesterTotalWeeks: HK1_WEEKS,
      label: `Nghỉ Tết — kết thúc Học kỳ 1 năm học ${schoolYear}`,
      schoolYear,
      isSummer: false,
    };
  }

  // HK1
  if (now <= hk1End) {
    const elapsed = now.getTime() - schoolStart.getTime();
    const semWeek = Math.min(Math.max(Math.ceil(elapsed / msPerWeek), 1), HK1_WEEKS);
    const weekNum = semWeek;
    return {
      weekNum,
      totalWeeks: TOTAL_WEEKS,
      percent: weekNum / TOTAL_WEEKS,
      semester: 1,
      semesterWeek: semWeek,
      semesterTotalWeeks: HK1_WEEKS,
      label: `Học kỳ 1 — Tuần ${semWeek}/${HK1_WEEKS}`,
      schoolYear,
      isSummer: false,
    };
  }

  // HK2
  const elapsed = now.getTime() - hk2Start.getTime();
  const semWeek = Math.min(Math.max(Math.ceil(elapsed / msPerWeek), 1), HK2_WEEKS);
  const weekNum = HK1_WEEKS + semWeek;
  return {
    weekNum,
    totalWeeks: TOTAL_WEEKS,
    percent: weekNum / TOTAL_WEEKS,
    semester: 2,
    semesterWeek: semWeek,
    semesterTotalWeeks: HK2_WEEKS,
    label: `Học kỳ 2 — Tuần ${semWeek}/${HK2_WEEKS}`,
    schoolYear,
    isSummer: false,
  };
}
