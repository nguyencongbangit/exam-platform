'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';

interface Subject {
  id: string;
  name: string;
  icon?: string;
}

interface MeData {
  role?: string;
  student?: { grade?: { name: string } };
}

const DIFFICULTIES = [
  { key: 'EASY', label: 'Dễ', color: 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200', activeColor: 'bg-green-500 text-white border-green-500' },
  { key: 'MEDIUM', label: 'Trung bình', color: 'bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200', activeColor: 'bg-yellow-500 text-white border-yellow-500' },
  { key: 'HARD', label: 'Khó', color: 'bg-red-100 text-red-700 border-red-300 hover:bg-red-200', activeColor: 'bg-red-500 text-white border-red-500' },
];

export default function GamePage() {
  const router = useRouter();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [me, setMe] = useState<MeData | null>(null);
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [subjectId, setSubjectId] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState('');
  const [joinError, setJoinError] = useState('');

  useEffect(() => {
    fetch('/api/subjects').then(r => r.json()).then(data => setSubjects(Array.isArray(data) ? data : data.subjects || [])).catch(() => {});
    fetch('/api/me')
      .then(r => { if (r.status === 401) { router.push('/login'); return null; } return r.json(); })
      .then(data => { if (data) setMe(data); })
      .catch(() => {});
  }, []);

  const handleCreate = async () => {
    setCreating(true);
    setError('');
    try {
      const res = await fetch('/api/game/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, subjectId: subjectId || undefined }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Lỗi tạo phòng'); return; }
      router.push(`/game/${data.roomId}`);
    } catch {
      setError('Lỗi kết nối');
    } finally {
      setCreating(false);
    }
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) { setJoinError('Nhập mã phòng'); return; }
    setJoining(true);
    setJoinError('');
    try {
      const res = await fetch('/api/game/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: joinCode.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setJoinError(data.error || 'Lỗi vào phòng'); return; }
      router.push(`/game/${data.roomId}`);
    } catch {
      setJoinError('Lỗi kết nối');
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl mb-5 shadow-lg shadow-purple-200">
            <span className="text-4xl">🎮</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Trò Chơi Thi Đấu</h1>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Thi đấu trực tiếp với bạn bè! Trả lời nhanh, ghi điểm cao và leo lên bảng xếp hạng.
          </p>
          {me?.student?.grade && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              <span>📚</span> {me.student.grade.name}
            </div>
          )}
          {me && me.role !== 'STUDENT' && (
            <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
              ⚠️ Chỉ tài khoản học sinh mới có thể tạo và tham gia phòng chơi
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Room */}
          <div className="bg-white rounded-3xl shadow-xl shadow-purple-100 border border-purple-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-2xl flex items-center justify-center text-xl">🚀</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Tạo phòng</h2>
                <p className="text-sm text-gray-500">Mời bạn bè cùng thi đấu</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Độ khó</label>
                <div className="flex gap-2">
                  {DIFFICULTIES.map(d => (
                    <button
                      key={d.key}
                      onClick={() => setDifficulty(d.key)}
                      className={`flex-1 py-2.5 px-3 rounded-xl border-2 font-semibold text-sm transition-all ${difficulty === d.key ? d.activeColor : d.color}`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Môn học (tùy chọn)</label>
                <select
                  value={subjectId}
                  onChange={e => setSubjectId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none text-sm bg-gray-50"
                >
                  <option value="">Tất cả môn học</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <span>⚠️</span> {error}
                </div>
              )}

              <button
                onClick={handleCreate}
                disabled={creating || me?.role !== 'STUDENT'}
                className="w-full py-4 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-purple-200 transition-all disabled:opacity-60 text-base"
              >
                {creating ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang tạo...
                  </span>
                ) : '🚀 Tạo phòng ngay'}
              </button>
            </div>
          </div>

          {/* Join Room */}
          <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-100 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-xl">🔑</div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Vào phòng</h2>
                <p className="text-sm text-gray-500">Nhập mã do chủ phòng chia sẻ</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Mã phòng</label>
                <input
                  type="text"
                  value={joinCode}
                  onChange={e => setJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6))}
                  onKeyDown={e => e.key === 'Enter' && handleJoin()}
                  placeholder="VD: ABC123"
                  maxLength={6}
                  className="w-full px-4 py-5 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:outline-none text-center text-3xl font-mono font-bold tracking-[0.3em] uppercase bg-gray-50 placeholder:text-gray-300 placeholder:text-xl placeholder:tracking-normal"
                />
              </div>

              {joinError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <span>⚠️</span> {joinError}
                </div>
              )}

              <div className="mt-auto pt-4">
                <button
                  onClick={handleJoin}
                  disabled={joining || joinCode.length < 6 || me?.role !== 'STUDENT'}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 text-base"
                >
                  {joining ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Đang vào...
                    </span>
                  ) : '🔑 Vào phòng'}
                </button>
              </div>
            </div>

            {/* How to play */}
            <div className="mt-6 bg-indigo-50 rounded-2xl p-4">
              <p className="text-xs font-semibold text-indigo-700 mb-2 uppercase tracking-wide">Cách chơi</p>
              <ul className="space-y-1.5 text-sm text-indigo-600">
                <li className="flex items-start gap-2"><span>1.</span> Chủ phòng tạo phòng và chia sẻ mã 6 ký tự</li>
                <li className="flex items-start gap-2"><span>2.</span> Bạn bè nhập mã để vào phòng chờ</li>
                <li className="flex items-start gap-2"><span>3.</span> Trả lời nhanh để ghi điểm cao hơn</li>
                <li className="flex items-start gap-2"><span>4.</span> Người có điểm cao nhất thắng! 🏆</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
