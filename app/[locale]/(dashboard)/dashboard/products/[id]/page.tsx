'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/navigation';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { use } from 'react';
import { ArrowLeft, Save } from 'lucide-react';
import ImageUpload from '@/components/dashboard/ImageUpload';
import VideoUpload from '@/components/dashboard/VideoUpload';
import RichTextEditor from '@/components/dashboard/RichTextEditor';
import { useTranslations } from 'next-intl';

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
  name_ar?: string;
  description_ar?: string;
  product_info_ar?: string;
  category_ar?: string;
}

interface Category {
  id: number;
  name: string;
  name_ar: string | null;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const t = useTranslations('dashboard.products');
  const tc = useTranslations('dashboard.common');
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const { register, handleSubmit, reset } = useForm<Product>();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [productInfoAr, setProductInfoAr] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (id) fetchProduct();
    fetchCategories();
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`/api/products/${id}`);
      reset(res.data);
      const allMedia: string[] = res.data.images || [];
      const isVideo = (url: string) => /\.(mp4|webm|mov|ogg|avi)$/i.test(url) || url.includes('/video/upload/');
      setImages(allMedia.filter((u) => !isVideo(u)));
      setVideos(allMedia.filter((u) => isVideo(u)));
      setDescription(res.data.description || '');
      setProductInfo(res.data.product_info || '');
      setDescriptionAr(res.data.description_ar || '');
      setProductInfoAr(res.data.product_info_ar || '');
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
        description,
        product_info: productInfo,
        description_ar: descriptionAr,
        product_info_ar: productInfoAr,
        images: [...images, ...videos],
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
        <ArrowLeft className="w-4 h-4 me-2" /> {t('backToProducts')}
      </button>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('editProduct')}</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Shared Fields */}
          <div className="border-b border-gray-200 pb-1 mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('shared')}</span>
          </div>
          <ImageUpload
            value={images}
            onChange={(urls) => setImages(urls as string[])}
            folder="organiyo/products"
            label="Product Images"
            multiple={true}
          />
          <VideoUpload
            value={videos}
            onChange={setVideos}
            folder="organiyo/products"
          />
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('price')}</label>
              <input
                type="number"
                step="0.01"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('previousPrice')} <span className="text-gray-400 text-xs">({tc('optional')})</span></label>
              <input
                type="number"
                step="0.01"
                {...register('prev_price', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 mb-6">
            <input
              type="checkbox"
              {...register('is_active')}
              id="is_active"
              className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-gray-700">{tc('activeOnWebsite')}</label>
          </div>

          {/* English Fields */}
          <div className="border-b border-gray-200 pb-1 mb-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('english')}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('productName')}</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
            <select
              {...register('category')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            >
              <option value="">{t('selectCategory')}</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('description')}</label>
            <RichTextEditor value={description} onChange={setDescription} placeholder="Brief product description..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('productInfo')}</label>
            <RichTextEditor value={productInfo} onChange={setProductInfo} placeholder="Detailed production information, ingredients, etc..." />
          </div>

          {/* Arabic Fields */}
          <div className="border-b border-gray-200 pb-1 mb-3 mt-6">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('arabic')}</span>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('productNameAr')}</label>
            <input
              {...register('name_ar')}
              dir="rtl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
              placeholder="اسم المنتج"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('categoryAr')}</label>
            <select
              {...register('category_ar')}
              dir="rtl"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            >
              <option value="">اختر الفئة</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name_ar || cat.name}>{cat.name_ar || cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('descriptionAr')}</label>
            <RichTextEditor value={descriptionAr} onChange={setDescriptionAr} placeholder="وصف مختصر للمنتج..." dir="rtl" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('productInfoAr')}</label>
            <RichTextEditor value={productInfoAr} onChange={setProductInfoAr} placeholder="معلومات تفصيلية عن المنتج..." dir="rtl" />
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
