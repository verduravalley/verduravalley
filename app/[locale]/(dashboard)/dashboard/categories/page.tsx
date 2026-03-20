'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Tag, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { Dialog } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';

interface Category {
  id: number;
  name: string;
  name_ar: string | null;
  slug: string;
  sort_order: number;
}

interface CategoryFormData {
  name: string;
  name_ar: string;
  sort_order: number;
}

export default function CategoriesPage() {
  const t = useTranslations('dashboard.categories');
  const tc = useTranslations('dashboard.common');

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const { register, handleSubmit, reset } = useForm<CategoryFormData>();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingCategory(null);
    reset({ name: '', name_ar: '', sort_order: 0 });
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    reset({ name: category.name, name_ar: category.name_ar || '', sort_order: category.sort_order });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    reset();
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      if (editingCategory) {
        await axios.put(`/api/categories/${editingCategory.id}`, data);
      } else {
        await axios.post('/api/categories', data);
      }
      closeModal();
      fetchCategories();
    } catch (error) {
      alert(editingCategory ? 'Failed to update category' : 'Failed to create category');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter(c => c.id !== id));
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Tag className="w-5 h-5 text-green-600" /> {t('title')}
        </h1>
        <button
          className="bg-green-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-green-700 transition shadow-sm text-sm"
          onClick={openAddModal}
        >
          <Plus className="w-4 h-4" /> {t('addCategory')}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('nameAr')}</th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('slug')}</th>
              <th className="px-4 py-3 text-start text-xs font-medium text-gray-500 uppercase tracking-wider">{t('sortOrder')}</th>
              <th className="px-4 py-3 text-end text-xs font-medium text-gray-500 uppercase tracking-wider">{tc('actions')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-4 text-center">{tc('loading')}</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">{t('noCategories')}</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 inline-flex text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {cat.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700" dir="rtl">
                    {cat.name_ar || <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 font-mono">{cat.slug}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{cat.sort_order}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-end text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={() => openEditModal(cat)}>
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900" onClick={() => handleDelete(cat.id)}>
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
          <Dialog.Panel className="mx-auto max-w-sm w-full rounded-2xl bg-white p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <Dialog.Title className="text-xl font-bold text-gray-900">
                {editingCategory ? t('editCategory') : t('addNewCategory')}
              </Dialog.Title>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')} (EN)</label>
                <input
                  {...register('name')}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="e.g. Mushrooms"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('nameAr')} (AR) <span className="text-gray-400 text-xs">({tc('optional')})</span></label>
                <input
                  {...register('name_ar')}
                  dir="rtl"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="مثال: مشروم"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('sortOrder')} <span className="text-gray-400 text-xs">({tc('optional')})</span></label>
                <input
                  type="number"
                  {...register('sort_order', { valueAsNumber: true })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
                  placeholder="0"
                />
              </div>

              <div className="flex gap-4 mt-6">
                <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium">
                  {tc('cancel')}
                </button>
                <button type="submit" className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium shadow-sm flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  {editingCategory ? tc('saveChanges') : t('createCategory')}
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
