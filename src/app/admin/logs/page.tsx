'use client';

import { useEffect, useState } from 'react';
import Card, { CardBody } from '@/components/ui/Card';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { formatDateTime } from '@/lib/utils';

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate recent activity from attempts
    fetch('/api/admin/logs')
      .then(r => r.json())
      .then(d => { setLogs(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900">Nhật ký hệ thống</h1>

      <Card>
        <CardBody className="p-0">
          {logs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <p>Chưa có hoạt động nào được ghi lại</p>
              <p className="text-sm mt-2">Nhật ký sẽ hiển thị khi có người dùng đăng nhập và làm bài</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {logs.map((log, i) => (
                <div key={i} className="flex items-start gap-3 px-6 py-4">
                  <span className="text-lg">{log.icon || '📝'}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{log.message}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{log.user} • {formatDateTime(log.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
