export const SUBJECTS = [
  { id: 'sub-toan',        name: 'Toán học',          code: 'TOAN',        icon: '📐' },
  { id: 'sub-van',         name: 'Ngữ Văn',           code: 'VAN',         icon: '📚' },
  { id: 'sub-anh',         name: 'Tiếng Anh',         code: 'ANH',         icon: '🌍' },
  { id: 'sub-ly',          name: 'Vật Lý',            code: 'LY',          icon: '⚡' },
  { id: 'sub-hoa',         name: 'Hóa Học',           code: 'HOA',         icon: '🧪' },
  { id: 'sub-sinh',        name: 'Sinh Học',          code: 'SINH',        icon: '🌿' },
  { id: 'sub-khtn',        name: 'Khoa học tự nhiên', code: 'KHTN',        icon: '🔬' },
  { id: 'sub-lichsu-dialy',name: 'Lịch sử & Địa lí', code: 'LICHSU_DIALY',icon: '🗺️' },
  { id: 'sub-gdcd',        name: 'Giáo dục công dân', code: 'GDCD',        icon: '⚖️' },
  { id: 'sub-tinhoc',      name: 'Tin học & CN',      code: 'TINHOC',      icon: '💻' },
  { id: 'sub-congnghee',   name: 'Công nghệ',         code: 'CONGNGHEE',   icon: '⚙️' },
  { id: 'sub-tieng-viet',  name: 'Tiếng Việt',        code: 'TIENG_VIET',  icon: '✏️' },
  { id: 'sub-khoahoc',     name: 'Khoa học',          code: 'KHOAHOC',     icon: '🧬' },
  { id: 'sub-daoduc',      name: 'Đạo đức',           code: 'DAODUC',      icon: '🌸' },
  { id: 'sub-hdtn',        name: 'HĐ Trải nghiệm',   code: 'HDTN',        icon: '🎯' },
  { id: 'sub-amnhac',      name: 'Âm nhạc',           code: 'AMNHAC',      icon: '🎵' },
  { id: 'sub-mythuat',     name: 'Mĩ thuật',          code: 'MYTHUAT',     icon: '🎨' },
  { id: 'sub-gdtc',        name: 'GDTC',              code: 'GDTC',        icon: '⚽' },
];

export const GRADES = Array.from({ length: 8 }, (_, i) => ({
  id: `grade-${i + 5}`,
  name: `Lớp ${i + 5}`,
}));

export const DIFFICULTIES = [
  { id: 'EASY',      label: 'Dễ',         emoji: '🟢' },
  { id: 'MEDIUM',    label: 'Trung bình', emoji: '🟡' },
  { id: 'HARD',      label: 'Khó',        emoji: '🔴' },
  { id: 'VERY_HARD', label: 'Rất khó',   emoji: '⚫' },
];

export const SUBJECT_ICON: Record<string, string> = Object.fromEntries(
  SUBJECTS.map((s) => [s.id, s.icon])
);
