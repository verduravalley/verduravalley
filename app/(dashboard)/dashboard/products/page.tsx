'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Package, Plus, Pencil, Trash2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import MultiImageUpload from '@/components/dashboard/MultiImageUpload';
import CloudinaryImage from '@/components/CloudinaryImage';

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

interface ProductFormData {
  name: string;
  slug: string;
  category: string;
  description: string;
  product_info: string;
  price: number;
  prev_price: number | null;
  is_active: boolean;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const { register, handleSubmit, reset } = useForm<ProductFormData>();

  useEffect(() => {
    fetchProducts();
  }, []);

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
        images: images
      };
      await axios.post('/api/products', payload);
      setIsModalOpen(false);
      reset();
      setImages([]);
      fetchProducts();
    } catch (error) {
      alert('Failed to create product');
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
      await axios.delete(`/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      alert('Failed to delete');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package className="w-6 h-6" /> Products
        </h1>
        <button 
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
            ) : products.length === 0 ? (
               <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No products found.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        {product.images?.[0] ? (
                          <CloudinaryImage className="h-10 w-10 object-cover" src={product.images[0]} alt="" width={40} height={40} />
                        ) : (
                          <Package className="h-6 w-6 m-2 text-gray-400" />
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {product.category || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${Number(product.price || 0).toFixed(2)}</div>
                    {product.prev_price && (
                      <div className="text-xs text-gray-400 line-through">${Number(product.prev_price).toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${product.is_active !== false ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {product.is_active !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4" onClick={() => router.push(`/dashboard/products/${product.id}`)}>
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="w-4 h-4" />
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
              <Dialog.Title className="text-xl font-bold text-gray-900">Add New Product</Dialog.Title>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input {...register('name')} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="e.g. Organic Apple" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select {...register('category')} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition">
                  <option value="">Select Category</option>
                  <option value="Basil">Basil</option>
                  <option value="Mushrooms">Mushrooms</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prev Price <span className="text-gray-400 text-xs">(optional)</span></label>
                  <input type="number" step="0.01" {...register('prev_price', { valueAsNumber: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition" placeholder="0.00" />
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
                <textarea {...register('description')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition h-20" placeholder="Brief product description..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Info</label>
                <textarea {...register('product_info')} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition h-20" placeholder="Detailed production info, ingredients..." />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" {...register('is_active')} id="is_active_new" defaultChecked className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                <label htmlFor="is_active_new" className="text-sm font-medium text-gray-700">Active (visible on website)</label>
              </div>

              <div className="flex gap-4 mt-8">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm">
                  Create Product
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
