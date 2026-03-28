'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingBag } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CustomRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  website?: string;
  product_name: string;
  category?: string;
  quantity?: string;
  description?: string;
  created_at: string;
}

export default function CustomRequestsPage() {
  const t = useTranslations('dashboard.customRequests');
  const tc = useTranslations('dashboard.common');
  const [requests, setRequests] = useState<CustomRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('/api/contact/custom-product');
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-green-600" /> {t('title')}
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-40" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3 mt-2">
                  <div className="flex gap-4">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28" />
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
                  </div>
                </div>
              </div>
            ))
          ) : requests.length === 0 ? (
            <div className="p-16 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-medium">{t('noRequests')}</p>
              <p className="text-gray-400 text-xs mt-1">Custom product requests will appear here.</p>
            </div>
          ) : (
            requests.map((req) => (
              <div key={req.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{req.name}</h3>
                    <p className="text-xs text-gray-500">{req.email}</p>
                    {req.phone && <p className="text-xs text-gray-500">{t('phone')}: {req.phone}</p>}
                    {req.business_name && <p className="text-xs text-gray-500">{t('business')}: {req.business_name}</p>}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(req.created_at).toLocaleDateString()}
                  </span>
                </div>

                <div className="bg-green-50 rounded-lg p-3 mt-2">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 text-xs">{t('productName')}:</span>
                      <p className="font-medium text-gray-800">{req.product_name}</p>
                    </div>
                    {req.category && (
                      <div>
                        <span className="text-gray-500 text-xs">{t('category')}:</span>
                        <p className="font-medium text-gray-800">{req.category}</p>
                      </div>
                    )}
                    {req.quantity && (
                      <div>
                        <span className="text-gray-500 text-xs">{t('quantity')}:</span>
                        <p className="font-medium text-gray-800">{req.quantity}</p>
                      </div>
                    )}
                  </div>
                  {req.description && (
                    <p className="text-sm text-gray-600 mt-2 border-t border-green-100 pt-2">{req.description}</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
