'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { formatDate } from '@/lib/utils';
import { Lock, Star, Trophy, Flame, Medal } from 'lucide-react';

const REASON_LABEL: Record<string, { label: string; color: string }> = {
  HARD_PERFECT: { label: '⭐ Điểm tuyệt đối (Khó)', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
  HARD_GREAT:   { label: '🔥 Xuất sắc (Khó)',       color: 'text-orange-600 bg-orange-50 border-orange-200' },
  HARD_GOOD:    { label: '👍 Tốt (Khó)',             color: 'text-blue-600 bg-blue-50 border-blue-200' },
  MEDIUM_GOOD:  { label: '✅ Giỏi (Trung Bình)',     color: 'text-green-600 bg-green-50 border-green-200' },
};

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy size={18} className="text-yellow-500" />;
  if (rank === 2) return <Medal size={18} className="text-gray-400" />;
  if (rank === 3) return <Medal size={18} className="text-amber-600" />;
  return <span className="text-xs font-bold text-gray-500 w-[18px] text-center">{rank}</span>;
}

export default function AchievementsPage() {
  const [achData, setAchData] = useState<{ earned: any[]; all: any[] }>({ earned: [], all: [] });
  const [pointData, setPointData] = useState<{ totalPoints: number; myRank: number | null; history: any[]; leaderboard: any[] }>({
    totalPoints: 0, myRank: null, history: [], leaderboard: [],
  });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'badges' | 'points'>('points');

  useEffect(() => {
    Promise.all([
      fetch('/api/student/achievements').then(r => r.json()),
      fetch('/api/student/points').then(r => r.json()),
    ]).then(([ach, pts]) => {
      setAchData(ach);
      setPointData(pts);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Thành tích & Điểm thưởng</h1>
          <p className="text-gray-500 mt-1">Ôn luyện chăm chỉ để tích điểm và leo bảng xếp hạng!</p>
        </div>
        {/* Tổng điểm nổi bật */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-5 py-3 rounded-2xl shadow-md">
          <Star size={24} fill="white" />
          <div>
            <p className="text-xs font-semibold opacity-90">Tổng điểm của tôi</p>
            <p className="text-2xl font-extrabold leading-tight">{pointData.totalPoints}</p>
          </div>
          {pointData.myRank && (
            <div className="ml-2 border-l border-white/40 pl-3">
              <p className="text-xs opacity-90">Xếp hạng</p>
              <p className="text-xl font-extrabold">#{pointData.myRank}</p>
            </div>
          )}
        </div>
      </div>

      {/* Quy tắc tích điểm */}
      <Card className="border-blue-100 bg-blue-50/60">
        <CardBody className="py-3">
          <p className="text-sm font-bold text-blue-800 mb-2">📋 Cách tích điểm thưởng</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-700">
            <div className="flex items-center gap-2"><span className="font-bold text-yellow-600">⭐ +5 điểm</span> Chế độ Khó — đạt 10/10</div>
            <div className="flex items-center gap-2"><span className="font-bold text-orange-500">🔥 +3 điểm</span> Chế độ Khó — điểm trên 9</div>
            <div className="flex items-center gap-2"><span className="font-bold text-blue-600">👍 +1 điểm</span> Chế độ Khó — điểm trên 8</div>
            <div className="flex items-center gap-2"><span className="font-bold text-green-600">✅ +1 điểm</span> Chế độ Trung Bình — từ 9 điểm trở lên</div>
          </div>
          <p className="text-xs text-blue-600 mt-2 font-medium">⏰ Mỗi ngày mỗi môn tối đa được tính <strong>2 lần</strong></p>
          <p className="text-xs text-purple-700 mt-1 font-semibold">🇬🇧 Tiếng Anh được nhân đôi điểm thưởng (mọi chế độ)</p>
        </CardBody>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setTab('points')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${tab === 'points' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          🏆 Bảng xếp hạng điểm
        </button>
        <button
          onClick={() => setTab('badges')}
          className={`px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${tab === 'badges' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          🎖 Huy hiệu ({achData.earned.length}/{achData.all.length})
        </button>
      </div>

      {tab === 'points' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bảng xếp hạng */}
          <div>
            <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Trophy size={18} className="text-yellow-500" /> Bảng xếp hạng</h2>
            <Card>
              <CardBody className="p-0">
                {pointData.leaderboard.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-8">Chưa có ai tích điểm</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {pointData.leaderboard.map(row => (
                      <li key={row.studentId} className={`flex items-center gap-3 px-4 py-3 ${row.isMe ? 'bg-yellow-50' : ''}`}>
                        <div className="w-6 flex justify-center">{getRankIcon(row.rank)}</div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {row.avatar ? <img src={row.avatar} className="w-8 h-8 rounded-full object-cover" /> : row.name[0]}
                        </div>
                        <span className={`flex-1 text-sm font-semibold ${row.isMe ? 'text-yellow-700' : 'text-gray-800'}`}>
                          {row.name} {row.isMe && <span className="text-xs font-normal">(bạn)</span>}
                        </span>
                        <span className="flex items-center gap-1 font-bold text-orange-500">
                          <Star size={14} fill="currentColor" /> {row.totalPoints}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardBody>
            </Card>
          </div>

          {/* Lịch sử điểm gần đây */}
          <div>
            <h2 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><Flame size={18} className="text-orange-500" /> Điểm gần đây</h2>
            {pointData.history.length === 0 ? (
              <Card><CardBody><p className="text-sm text-gray-400 text-center py-6">Chưa có điểm nào. Hãy luyện tập để tích điểm!</p></CardBody></Card>
            ) : (
              <div className="space-y-2">
                {pointData.history.map((item: any) => {
                  const meta = REASON_LABEL[item.reason] ?? { label: `+${item.points} điểm`, color: 'text-gray-600 bg-gray-50 border-gray-200' };
                  return (
                    <div key={item.id} className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs ${meta.color}`}>
                      <span className="font-bold text-sm">+{item.points}</span>
                      <div className="flex-1">
                        <p className="font-semibold">{meta.label}{item.points > [5,3,1][['HARD_PERFECT','HARD_GREAT','HARD_GOOD','MEDIUM_GOOD'].indexOf(item.reason)] ? ' ×2 🇬🇧' : ''}</p>
                        <p className="opacity-75">{item.subject?.name ?? 'Tổng hợp'} · {formatDate(item.earnedAt)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achData.all.map((ach: any) => {
            const earned = achData.earned.find((e: any) => e.achievementId === ach.id);
            const isEarned = !!earned;
            return (
              <Card key={ach.id} className={!isEarned ? 'opacity-60' : ''}>
                <CardBody className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ${isEarned ? 'bg-yellow-100' : 'bg-gray-100'}`}>
                    {isEarned ? ach.icon : <Lock size={24} className="text-gray-400" />}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{ach.name}</p>
                    <p className="text-xs text-gray-500">{ach.description}</p>
                    {isEarned && (
                      <p className="text-xs text-yellow-600 font-semibold mt-1">Đạt ngày {formatDate(earned.earnedAt)}</p>
                    )}
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
