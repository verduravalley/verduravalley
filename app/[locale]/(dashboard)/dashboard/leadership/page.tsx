'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Plus, Pencil, Trash2, X } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import ImageUpload from '@/components/dashboard/ImageUpload';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Member {
  id: string;
  name: string;
  title: string;
  image_url: string;
  images?: string[];
  name_ar?: string;
  title_ar?: string;
}

interface MemberFormData {
  name: string;
  title: string;
  sort_order: number;
  name_ar: string;
  title_ar: string;
}

export default function LeadershipPage() {
  const router = useRouter();
  const t = useTranslations('dashboard.leadership');
  const tc = useTranslations('dashboard.common');
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<MemberFormData>();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/leadership');
      setMembers(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: MemberFormData) => {
    try {
      await axios.post('/api/leadership', {
        ...data,
        images,
        image_url: images[0] || '',
      });
      closeModal();
      fetchMembers();
    } catch (error) {
      alert('Failed to add member');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setImages([]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`/api/leadership/${id}`);
      setMembers(members.filter(m => m.id !== id));
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
           <Users className="w-5 h-5 text-green-600" />
          {t('title')}
        </h1>
        <button
          className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-sm text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> {t('addMember')}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-gray-500">{t('loadingMembers')}</div>
        ) : members.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500">{t('noMembers')}</div>
        ) : members.map((member) => (
          <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-3 hover:shadow-md transition">
            <div className="relative">
               <Image
                src={member.image_url || "https://via.placeholder.com/150"}
                alt={member.name}
                className="w-14 h-14 rounded-xl object-cover bg-gray-50 ring-2 ring-gray-50"
                width={56}
                height={56}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 text-base leading-tight truncate">{member.name}</h3>
              <p className="text-xs text-green-600 font-medium mt-0.5 truncate">{member.title}</p>
            </div>
            <div className="flex flex-col gap-2">
              <button 
                className="text-slate-400 hover:text-blue-600 hover:bg-blue-50 p-2 rounded-xl transition" 
                onClick={() => router.push(`/dashboard/leadership/${member.id}`)}
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button 
                className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-xl transition" 
                onClick={() => handleDelete(member.id)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900">{t('addTeamMember')}</Dialog.Title>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Shared Fields */}
              <div className="border-b border-gray-200 pb-1 mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('shared')}</span>
              </div>
              <ImageUpload
                value={images}
                onChange={(urls) => setImages(urls as string[])}
                folder="organiyo/leadership"
                label="Member Photo(s)"
                multiple={true}
              />
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortOrderOptional')}</label>
                <input type="number" {...register('sort_order')} className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" defaultValue={0} />
              </div>

              {/* English Fields */}
              <div className="border-b border-gray-200 pb-1 mb-3 mt-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('english')}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullName')}</label>
                <input {...register('name')} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('titleDesignation')}</label>
                <input {...register('title')} required className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" />
              </div>

              {/* Arabic Fields */}
              <div className="border-b border-gray-200 pb-1 mb-3 mt-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('arabic')}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('fullNameAr')}</label>
                <input {...register('name_ar')} dir="rtl" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="الاسم الكامل" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('titleDesignationAr')}</label>
                <input {...register('title_ar')} dir="rtl" className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="المسمى الوظيفي" />
              </div>


              <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition font-bold text-sm">
                  {tc('cancel')}
                </button>
                <button type="submit" className="flex-1 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-bold text-sm shadow-lg shadow-green-200">
                  {t('saveMember')}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
