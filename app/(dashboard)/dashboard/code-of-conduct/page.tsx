'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, ExternalLink, Upload, Eye, Loader2 } from 'lucide-react';
import ImageUpload from '@/components/dashboard/ImageUpload';

export default function CocPage() {
  const [pdfUrl, setPdfUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'view' | 'upload'>('view');

  useEffect(() => {
    fetchCoc();
  }, []);

  const fetchCoc = async () => {
    try {
      const res = await axios.get('/api/code-of-conduct');
      setPdfUrl(res.data.pdfUrl || '');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [saving, setSaving] = useState(false);

  const handlePdfChange = async (url: string) => {
    if (!url) return;
    setSaving(true);
    try {
      await axios.post('/api/code-of-conduct', { pdfUrl: url });
      setPdfUrl(url);
      setActiveTab('view');
    } catch (error) {
      alert('Failed to update');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-600" /> Code of Conduct
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('view')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'view'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50/30'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Eye className="w-4 h-4" /> View Current
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
              activeTab === 'upload'
                ? 'text-green-600 border-b-2 border-green-600 bg-green-50/30'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Upload className="w-4 h-4" /> Upload Replacement
          </button>
        </div>

        <div className="p-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="mt-4 text-gray-500">Loading document...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {activeTab === 'view' ? (
                <div className="space-y-4">
                  {pdfUrl ? (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded border border-gray-200 text-red-500">
                            <FileText className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 truncate max-w-xs">
                              {pdfUrl.split('/').pop()}
                            </p>
                            <p className="text-xs text-gray-500 italic">Currently active on the website</p>
                          </div>
                        </div>
                        <a
                          href={pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-all"
                        >
                          Open PDF <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      {/* Preview Iframe */}
                      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden h-[500px] bg-gray-50">
                        <iframe
                          src={`/api/code-of-conduct/pdf?v=${Date.now()}#toolbar=0`}
                          className="w-full h-full"
                          title="Code of Conduct Preview"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                      <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-gray-900 font-medium">No document uploaded</h3>
                      <p className="text-gray-500 text-sm mt-1">Please upload a Code of Conduct document to display it on the website.</p>
                      <button 
                        onClick={() => setActiveTab('upload')}
                        className="mt-6 text-green-600 font-medium hover:underline text-sm"
                      >
                        Upload now
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Upload New Version</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploading a new file will replace the current Code of Conduct. The current version stays active until the new upload succeeds.
                    </p>
                  </div>

                  {saving && (
                    <div className="mb-4 flex items-center gap-2 text-sm text-green-600">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving new document...
                    </div>
                  )}

                  <ImageUpload
                    value=""
                    onChange={handlePdfChange}
                    folder="organiyo/documents"
                    accept="application/pdf"
                    label="Select PDF File"
                    resourceType="raw"
                  />
                  
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-100 flex gap-3">
                    <div className="flex-shrink-0 text-amber-500 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <p className="text-xs text-amber-800">
                      Recommendation: Ensure the PDF is optimized for web viewing and contains all the latest governance updates.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
