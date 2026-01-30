'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/dashboard/ImageUpload';

interface Member {
  id: string;
  name: string;
  title: string;
  image_url: string;
  sort_order: number;
}

export default function EditLeadershipPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { register, handleSubmit, reset } = useForm<Member>();
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const res = await axios.get(`/api/leadership/${id}`);
      reset(res.data);
      if (res.data.image_url) {
        setImageUrl(res.data.image_url);
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
        image_url: imageUrl,
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
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Leadership
      </button>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Team Member</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              {...register('title')}
              placeholder="e.g. CEO"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <ImageUpload
            value={imageUrl}
            onChange={setImageUrl}
            folder="organiyo/leadership"
            label="Member Photo"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
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
            <Save className="w-5 h-5" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
