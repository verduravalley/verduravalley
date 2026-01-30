'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { use } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import MultiImageUpload from '@/components/dashboard/MultiImageUpload';

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  product_info: string;
  price: number;
  prev_price: number | null;
  images: string[];
  is_active: boolean;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { register, handleSubmit, reset } = useForm<Product>();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      reset(res.data);
      setImages(res.data.images || []);
    } catch (error) {
      console.error('Failed to fetch product', error);
      alert('Product not found');
      router.push('/dashboard/products');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: Product) => {
    try {
      const slug = data.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s-]+/g, '_')
        .replace(/^_+|_+$/g, '');

      await axios.put(`/api/products/${id}`, {
        ...data,
        slug,
        images: images,
      });
      alert('Product updated successfully!');
      router.push('/dashboard/products');
    } catch (error) {
      console.error('Failed to update', error);
      alert('Failed to update product');
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-gray-500 hover:text-gray-800 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </button>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            >
              <option value="">Select Category</option>
              <option value="Basil">Basil</option>
              <option value="Mushrooms">Mushrooms</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Previous Price ($) <span className="text-gray-400 text-xs">(optional)</span></label>
              <input
                type="number"
                step="0.01"
                {...register('prev_price', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="0.00"
              />
            </div>
          </div>

          <MultiImageUpload
            value={images}
            onChange={setImages}
            folder="organiyo/products"
            label="Product Images"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="Brief product description..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Info</label>
            <textarea
              {...register('product_info')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="Detailed production information, ingredients, etc..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              {...register('is_active')}
              id="is_active"
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">Active (visible on website)</label>
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
