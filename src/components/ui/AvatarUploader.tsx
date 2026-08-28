'use client';

import { useRef } from 'react';

interface AvatarUploaderProps {
  avatar: string;
  name: string;
  onChange: (base64: string) => void;
}

/** Resize ảnh về 200×200 JPEG base64 bằng Canvas, không cần thư viện ngoài */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const SIZE = 200;
        const canvas = document.createElement('canvas');
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext('2d')!;
        // Crop hình vuông từ giữa rồi scale
        const min = Math.min(img.width, img.height);
        const sx = (img.width - min) / 2;
        const sy = (img.height - min) / 2;
        ctx.drawImage(img, sx, sy, min, min, 0, 0, SIZE, SIZE);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AvatarUploader({ avatar, name, onChange }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('Ảnh quá lớn, vui lòng chọn ảnh dưới 5MB');
      return;
    }
    try {
      const base64 = await resizeImage(file);
      onChange(base64);
    } catch {
      alert('Không thể đọc ảnh, vui lòng thử lại');
    }
    e.target.value = '';
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center cursor-pointer border-4 border-white shadow-md hover:opacity-80 transition-opacity"
        onClick={() => inputRef.current?.click()}
        title="Nhấn để đổi ảnh"
      >
        {avatar ? (
          <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="text-blue-700 text-3xl font-bold select-none">
            {name?.charAt(0)?.toUpperCase() || '?'}
          </span>
        )}
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="text-xs text-blue-600 hover:underline"
      >
        Đổi ảnh đại diện
      </button>
      {avatar && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-xs text-red-500 hover:underline"
        >
          Xóa ảnh
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
      <p className="text-xs text-gray-400">JPG, PNG · Tối đa 5MB</p>
    </div>
  );
}
