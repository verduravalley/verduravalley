'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Plus } from 'lucide-react';
import CloudinaryImage from '@/components/CloudinaryImage';

interface ImageUploadProps {
  value?: string | string[];
  onChange: (value: string | string[]) => void;
  folder?: string;
  accept?: string;
  label?: string;
  resourceType?: 'image' | 'raw' | 'auto';
  multiple?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  folder = 'organiyo',
  accept = 'image/*',
  label = 'Upload Image',
  resourceType = 'image',
  multiple = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const values = Array.isArray(value) ? value : value ? [value] : [];

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setError(null);

    try {
      const uploadPromises = Array.from(files).map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const base64 = reader.result as string;
              const response = await fetch('/api/upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  file: base64,
                  folder,
                  resourceType,
                }),
              });

              const data = await response.json();
              if (!response.ok) throw new Error(data.message || 'Upload failed');
              resolve(data.url);
            } catch (err) {
              reject(err);
            }
          };
          reader.onerror = () => reject(new Error('Failed to read file'));
          reader.readAsDataURL(file);
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);

      if (multiple) {
        onChange([...values, ...uploadedUrls]);
      } else {
        onChange(uploadedUrls[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  const handleRemove = (index: number) => {
    if (multiple) {
      const newValues = [...values];
      newValues.splice(index, 1);
      onChange(newValues);
    } else {
      onChange('');
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      <div className="flex flex-wrap gap-4">
        {values.map((url, index) => (
          <div key={`${url}-${index}`} className="relative inline-block">
            {resourceType === 'image' ? (
              <CloudinaryImage
                src={url}
                alt="Uploaded"
                className="h-32 w-32 object-cover rounded-lg border border-gray-200"
                width={128}
                height={128}
              />
            ) : (
              <div className="h-32 w-32 flex items-center justify-center bg-gray-100 rounded-lg border border-gray-200">
                <span className="text-xs text-gray-500 text-center px-2 break-all">
                  {url.split('/').pop()}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition shadow-sm"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}

        {(multiple || values.length === 0) && (
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
                <Plus className="h-8 w-8 text-gray-400" />
                <span className="mt-1 text-xs text-gray-500">
                  {multiple ? 'Add more' : 'Upload'}
                </span>
              </>
            )}
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileChange}
        className="hidden"
      />

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
