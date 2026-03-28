'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  website?: string;
  subject: string;
  message: string;
  created_at: string;
}

export default function ContactPage() {
  const t = useTranslations('dashboard.messages');
  const tc = useTranslations('dashboard.common');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('/api/contact');
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Mail className="w-5 h-5 text-green-600" /> {t('title')}
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-40" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                </div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mb-2" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-full" />
              </div>
            ))
          ) : messages.length === 0 ? (
            <div className="p-16 text-center">
              <Mail className="w-12 h-12 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-500 text-sm font-medium">{t('noMessages')}</p>
              <p className="text-gray-400 text-xs mt-1">Contact form submissions will appear here.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{msg.name}</h3>
                    <p className="text-xs text-gray-500">{msg.email}</p>
                    <p className="text-xs text-gray-500">{t('phone')}: {msg.phone || t('na')}</p>
                    {msg.business_name && (
                      <p className="text-xs text-gray-500">{t('business')}: {msg.business_name}</p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-800 mt-2">{msg.subject}</h4>
                <p className="text-sm text-gray-600 mt-1">{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
