'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from '@/i18n/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/dashboard/ImageUpload';
import { useTranslations } from 'next-intl';

interface Member {
  id: string;
  name: string;
  title: string;
  image_url: string;
  images?: string[];
  sort_order: number;
  name_ar?: string;
  title_ar?: string;
}

export default function EditLeadershipPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const t = useTranslations('dashboard.leadership');
  const tc = useTranslations('dashboard.common');
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { register, handleSubmit, reset } = useForm<Member>();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const res = await axios.get(`/api/leadership/${id}`);
      reset(res.data);
      if (res.data.images) {
        setImages(res.data.images);
      } else if (res.data.image_url) {
        setImages([res.data.image_url]);
      }
    } catch (error) {
      console.error('Failed to fetch member', error);
      alert('Member not found');
      router.push('/dashboard/leadership');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: Member) => {
    try {
      await axios.put(`/api/leadership/${id}`, {
        ...data,
        images,
        image_url: images[0] || '',
      });
      alert('Member updated successfully!');
      router.push('/dashboard/leadership');
    } catch (error) {
      console.error('Failed to update', error);
      alert('Failed to update member');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-500 hover:text-gray-800 transition"
      >
        <ArrowLeft className="w-4 h-4 me-2" /> {t('backToLeadership')}
      </button>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('editTeamMember')}</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* English Fields */}
          <div className="border-b border-gray-200 pb-1 mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('english')}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('jobTitle')}</label>
            <input
              {...register('title')}
              placeholder="e.g. CEO"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Arabic Fields */}
          <div className="border-b border-gray-200 pb-1 mb-3 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('arabic')}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullNameAr')}</label>
            <input
              {...register('name_ar')}
              dir="rtl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="الاسم الكامل"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('jobTitleAr')}</label>
            <input
              {...register('title_ar')}
              dir="rtl"
              placeholder="مثال: الرئيس التنفيذي"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          {/* Shared Fields */}
          <div className="border-b border-gray-200 pb-1 mb-3 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('shared')}</span>
          </div>
          <ImageUpload
            value={images}
            onChange={(urls) => setImages(urls as string[])}
            folder="organiyo/leadership"
            label="Member Photo(s)"
            multiple={true}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortOrder')}</label>
            <input
              type="number"
              {...register('sort_order')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <Save className="w-5 h-5" /> {tc('saveChanges')}
          </button>
        </form>
      </div>
    </div>
  );
}
