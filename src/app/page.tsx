'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Button from '@/components/ui/Button';
import { BookOpen, Clock, Users, Star, ChevronRight, Trophy, Target, TrendingUp, Zap, Flame } from 'lucide-react';

const STEPS = [
  { step: '1', title: 'Chọn độ khó', desc: 'Chọn Dễ, Trung Bình hoặc Khó phù hợp với trình độ của bạn', icon: Target },
  { step: '2', title: 'Làm bài ngẫu nhiên', desc: 'Hệ thống tự chọn câu hỏi ngẫu nhiên từ ngân hàng đề', icon: Zap },
  { step: '3', title: 'Xem kết quả', desc: 'Phân tích điểm yếu và ôn luyện câu sai mỗi ngày', icon: TrendingUp },
];

const MODES = [
  {
    key: 'EASY',
    label: 'Dễ',
    icon: BookOpen,
    color: 'from-green-400 to-green-600',
    shadow: 'shadow-green-200',
    count: 15,
    duration: 15,
    desc: 'Ôn kiến thức nền',
  },
  {
    key: 'MEDIUM',
    label: 'Trung bình',
    icon: Zap,
    color: 'from-blue-400 to-blue-600',
    shadow: 'shadow-blue-200',
    count: 20,
    duration: 20,
    desc: 'Kiểm tra năng lực',
  },
  {
    key: 'HARD',
    label: 'Khó',
    icon: Flame,
    color: 'from-red-400 to-red-600',
    shadow: 'shadow-red-200',
    count: 20,
    duration: 25,
    desc: 'Thử thách nâng cao',
  },
];

export default function HomePage() {
  const [stats, setStats] = useState({ students: 0, questions: 0 });

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => setStats({ students: d.totalStudents || 0, questions: d.totalQuestions || 0 }))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8">
          <Star size={14} fill="currentColor" />
          Nền tảng ôn luyện #1 Việt Nam
        </div>
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-200">
          <BookOpen size={40} className="text-white" />
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Ôn Luyện Đề
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4 leading-relaxed">
          Học đúng trọng tâm<br />
          <span className="text-blue-600 font-semibold">Luyện đúng năng lực</span><br />
          Tiến bộ mỗi ngày
        </p>
        <div className="flex items-center justify-center gap-4 mt-8 flex-wrap">
          <Link href="/practice">
            <Button size="xl" className="shadow-lg shadow-blue-200">
              Làm bài ngay
              <ChevronRight size={20} />
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="outline" size="xl">Đăng ký miễn phí</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 gap-6 max-w-xs mx-auto">
          {[
            { label: 'Học sinh', value: stats.students > 0 ? `${stats.students}+` : '1,200+', icon: Users },
            { label: 'Câu hỏi', value: stats.questions > 0 ? `${stats.questions}+` : '10,000+', icon: Trophy },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <Icon size={24} className="text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-extrabold text-gray-900">{value}</div>
              <div className="text-xs text-gray-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Difficulty Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Chọn độ khó phù hợp</h2>
          <p className="text-gray-500">Câu hỏi được chọn ngẫu nhiên từ ngân hàng — mỗi lần làm là một bộ đề mới</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {MODES.map((mode) => {
            const Icon = mode.icon;
            return (
              <Link key={mode.key} href="/practice">
                <div className={`rounded-3xl bg-gradient-to-br ${mode.color} p-6 text-white text-center shadow-lg ${mode.shadow} hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer`}>
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-extrabold mb-1">{mode.label}</h3>
                  <p className="text-white/80 text-sm mb-4">{mode.desc}</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-white/70">
                    <span>{mode.count} câu</span>
                    <span>•</span>
                    <span><Clock size={11} className="inline mr-0.5" />{mode.duration} phút</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Hướng dẫn sử dụng</h2>
            <p className="text-gray-600">Chỉ 3 bước đơn giản để bắt đầu hành trình học tập</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="text-center">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">Bước {step}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gradient-to-b from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Tính năng nổi bật</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⏱️', title: 'Thi thực tế', desc: 'Đồng hồ đếm ngược như thi thật' },
              { icon: '🎲', title: 'Đề ngẫu nhiên', desc: 'Mỗi lần là một bộ câu hỏi mới' },
              { icon: '🔁', title: 'Luyện câu sai', desc: 'Ôn tập lại những câu làm sai' },
              { icon: '📊', title: 'Phân tích chi tiết', desc: 'Xem điểm mạnh yếu từng chủ đề' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white/10 rounded-2xl p-6 text-white text-center backdrop-blur-sm">
                <div className="text-4xl mb-3">{icon}</div>
                <h3 className="font-bold mb-1">{title}</h3>
                <p className="text-blue-200 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={20} className="text-blue-400" />
            <span className="text-white font-bold">Ôn Luyện Đề</span>
          </div>
          <p className="text-sm">© 2024 Ôn Luyện Đề. Nền tảng học tập trực tuyến.</p>
        </div>
      </footer>
    </div>
  );
}
