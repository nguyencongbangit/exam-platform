import './globals.css';
import SessionWrapper from '@/components/providers/SessionWrapper';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Ôn Luyện Đề - Nền tảng học tập trực tuyến',
  description: 'Nền tảng ôn luyện đề thi trực tuyến hàng đầu Việt Nam',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <SessionWrapper>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e293b',
                color: '#fff',
                borderRadius: '12px',
                padding: '12px 16px',
              },
              success: {
                iconTheme: { primary: '#22c55e', secondary: '#fff' },
              },
              error: {
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </SessionWrapper>
      </body>
    </html>
  );
}
