'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const t = useTranslations('dashboard.settings');
  const tc = useTranslations('dashboard.common');

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    axios.get('/api/settings').then((res) => {
      setPhone(res.data.contact_phone || '');
      setEmail(res.data.contact_email || '');
    }).finally(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await axios.put('/api/settings', { contact_phone: phone, contact_email: email });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Settings className="w-5 h-5 text-green-600" /> {t('title')}
      </h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-w-lg">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">{t('contactInfo')}</h2>

        {loading ? (
          <p className="text-sm text-gray-500">{tc('loading')}</p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('phone')}</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. 01021002597"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">{t('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. info@verduravalley.com"
                dir="ltr"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition disabled:opacity-50"
              >
                {saving ? tc('loading') : tc('saveChanges')}
              </button>
              {saved && (
                <span className="text-sm text-green-600 font-medium">{t('saved')}</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
