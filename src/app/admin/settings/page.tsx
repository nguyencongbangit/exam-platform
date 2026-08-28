'use client';

import { useState, useEffect } from 'react';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Sparkles, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const [claudeKey, setClaudeKey] = useState('');
  const [hasClaudeKey, setHasClaudeKey] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((d) => {
        setHasClaudeKey(d.hasClaudeKey);
        if (d.claudeApiKey) setClaudeKey(d.claudeApiKey);
      })
      .catch(() => {});
  }, []);

  async function saveAiSettings() {
    if (!claudeKey || claudeKey.startsWith('****')) {
      toast.error('Vui lòng nhập API key mới');
      return;
    }
    setSaving(true);
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ claudeApiKey: claudeKey }),
    });
    setSaving(false);
    if (res.ok) {
      toast.success('Đã lưu Claude API key');
      setHasClaudeKey(true);
    } else {
      toast.error('Lỗi khi lưu');
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-extrabold text-gray-900">Cài đặt hệ thống</h1>

      <Card>
        <CardHeader><h3 className="font-bold">Thông tin nền tảng</h3></CardHeader>
        <CardBody className="space-y-4">
          <Input id="siteName" label="Tên nền tảng" defaultValue="Ôn Luyện Đề" />
          <Input id="siteDesc" label="Mô tả" defaultValue="Nền tảng ôn luyện đề thi trực tuyến hàng đầu Việt Nam" />
          <Button>Lưu thay đổi</Button>
        </CardBody>
      </Card>

      {/* AI / Claude settings */}
      <Card>
        <CardHeader>
          <h3 className="font-bold flex items-center gap-2">
            <Sparkles size={16} className="text-purple-500" />
            Kết nối AI — Anthropic Claude
          </h3>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm text-blue-800">
            API key dùng để sinh câu hỏi, đề thi tự động bằng Claude AI. Lấy key tại <strong>console.anthropic.com</strong> → <em>API Keys</em>.
          </div>

          <div className="relative">
            <Input
              id="claudeKey"
              label={`Claude API Key ${hasClaudeKey ? '(đã cấu hình ✓)' : '(chưa cấu hình)'}`}
              type={showKey ? 'text' : 'password'}
              placeholder="sk-ant-..."
              value={claudeKey}
              onChange={(e) => setClaudeKey(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
            >
              {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveAiSettings} loading={saving}>
              Lưu API key
            </Button>
            <Link href="/admin/ai">
              <Button variant="outline">
                <Sparkles size={15} />
                Mở trang sinh câu hỏi AI
              </Button>
            </Link>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader><h3 className="font-bold">Cài đặt đăng ký</h3></CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Cho phép đăng ký</p>
              <p className="text-sm text-gray-500">Người dùng mới có thể tự đăng ký tài khoản</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">Xác thực email</p>
              <p className="text-sm text-gray-500">Yêu cầu xác thực email khi đăng ký</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-blue-600" />
          </div>
          <Button>Lưu cài đặt</Button>
        </CardBody>
      </Card>
    </div>
  );
}
