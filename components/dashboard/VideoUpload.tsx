'use client';

import { useState, useRef } from 'react';
import { Video, X, Loader2, Plus } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  folder?: string;
}

export default function VideoUpload({ value = [], onChange, folder = 'organiyo/products' }: Props) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map((file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const base64 = reader.result as string;
              const res = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ file: base64, folder, resourceType: 'video' }),
              });
              const data = await res.json();
              if (!res.ok) throw new Error(data.message || 'Upload failed');
              resolve(data.url);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        })
      );

      const uploaded = await Promise.all(uploadPromises);
      onChange([...value, ...uploaded]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    const next = [...value];
    next.splice(index, 1);
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Product Videos</label>

      <div className="flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div key={`${url}-${index}`} className="relative">
            <div className="h-32 w-32 rounded-lg border border-gray-200 bg-gray-900 overflow-hidden flex items-center justify-center">
              <video
                src={url}
                className="h-full w-full object-cover"
                muted
                preload="metadata"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        <div
          onClick={() => !isUploading && inputRef.current?.click()}
          className={`h-32 w-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all ${
            isUploading
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed'
              : 'border-gray-300 hover:border-green-500 hover:bg-green-50'
          }`}
        >
          {isUploading ? (
            <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
          ) : (
            <>
              <Video className="h-7 w-7 text-gray-400" />
              <span className="mt-1 text-xs text-gray-500">Add video</span>
            </>
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="video/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
