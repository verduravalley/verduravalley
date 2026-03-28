'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, Pencil, Trash2, X } from 'lucide-react';
import { useRouter } from '@/i18n/navigation';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import ImageUpload from '@/components/dashboard/ImageUpload';
import VideoUpload from '@/components/dashboard/VideoUpload';
import RichTextEditor from '@/components/dashboard/RichTextEditor';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

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

interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  product_info: string;
  price: number;
  prev_price: number | null;
  is_active: boolean;
  name_ar: string;
  description_ar: string;
  product_info_ar: string;
  category_ar: string;
}

interface Category {
  id: number;
  name: string;
  name_ar: string | null;
}

export default function ProductsPage() {
  const router = useRouter();
  const t = useTranslations('dashboard.products');
  const tc = useTranslations('dashboard.common');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [productInfo, setProductInfo] = useState('');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [productInfoAr, setProductInfoAr] = useState('');

  const { register, handleSubmit, reset } = useForm<ProductFormData>();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      const slug = data.name
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s-]+/g, '_')
        .replace(/^_+|_+$/g, '');

      const payload = {
        ...data,
        slug,
        description,
        product_info: productInfo,
        description_ar: descriptionAr,
        product_info_ar: productInfoAr,
        images: [...images, ...videos],
      };
      await axios.post('/api/products', payload);
      setIsModalOpen(false);
      reset();
      setImages([]);
      setVideos([]);
      setDescription('');
      setProductInfo('');
      setDescriptionAr('');
      setProductInfoAr('');
      fetchProducts();
    } catch (error) {
      alert('Failed to create product');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
    setImages([]);
    setVideos([]);
    setDescription('');
    setProductInfo('');
    setDescriptionAr('');
    setProductInfoAr('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="w-5 h-5 text-green-600" /> {t('title')}
        </h1>
        <button
          className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-sm text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> {t('addProduct')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('product')}</th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('category')}</th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('price')}</th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
              <th className="px-4 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-gray-200 rounded-md animate-pulse flex-shrink-0" />
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse w-20" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse w-16" /></td>
                  <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded animate-pulse w-14" /></td>
                  <td className="px-4 py-3 text-end"><div className="h-4 bg-gray-200 rounded animate-pulse w-12 ml-auto" /></td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm font-medium">{t('noProducts')}</p>
                  <p className="text-gray-400 text-xs mt-1">Add your first product to get started.</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        {product.images?.[0] ? (
                          <Image className="h-8 w-8 object-cover" src={product.images[0]} alt={product.name} width={32} height={32} />
                        ) : (
                          <Package className="h-4 h-4 m-2 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-3 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[150px]">{product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.category || t('uncategorized')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 font-medium">${Number(product.price || 0).toFixed(2)}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 inline-flex text-[10px] leading-4 font-semibold rounded-full ${product.is_active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.is_active !== false ? tc('active') : tc('inactive')}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-end text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => router.push(`/dashboard/products/${product.id}`)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isModalOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900">{t('addNewProduct')}</Dialog.Title>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
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
                  <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('prevPrice')} <span className="text-gray-400 text-xs">({tc('optional')})</span></label>
                  <input type="number" step="0.01" {...register('prev_price', { valueAsNumber: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="0.00" />
                </div>
              </div>
              <div className="flex items-center gap-3 mt-4 mb-6">
                <input type="checkbox" {...register('is_active')} id="is_active_new" defaultChecked className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <label htmlFor="is_active_new" className="text-sm font-medium text-gray-700">{tc('activeOnWebsite')}</label>
              </div>

              {/* English Fields */}
              <div className="border-b border-gray-200 pb-1 mb-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('english')}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('productName')}</label>
                <input {...register('name')} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="e.g. Organic Apple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
                <select {...register('category')} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition">
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
                <RichTextEditor value={productInfo} onChange={setProductInfo} placeholder="Detailed production info, ingredients..." />
              </div>

              {/* Arabic Fields */}
              <div className="border-b border-gray-200 pb-1 mb-3 mt-6">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{tc('arabic')}</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('productNameAr')}</label>
                <input {...register('name_ar')} dir="rtl" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="مثال: تفاح عضوي" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('categoryAr')}</label>
                <select {...register('category_ar')} dir="rtl" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition">
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


              <div className="flex gap-4 mt-8">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                  {tc('cancel')}
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm">
                  {t('createProduct')}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
