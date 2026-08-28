import Header from '@/components/layout/Header';
import ParentSidebar from '@/components/layout/ParentSidebar';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex max-w-[1400px] mx-auto">
        <ParentSidebar />
        <main className="flex-1 p-6 min-w-0">{children}</main>
      </div>
    </div>
  );
}
