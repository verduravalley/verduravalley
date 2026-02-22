'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import DivAnimateYAxis from '@/components/marketing/utils/DivAnimateYAxis';
import { FileText, Loader2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const PdfViewer = dynamic(() => import('@/components/marketing/pdf/PdfViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
      <span className="text-gray-500 font-medium">Loading Document Viewer...</span>
    </div>
  )
});

const CodeOfConductPage = () => {
  const t = useTranslations('codeOfConductPage');
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdfUrl = async () => {
      try {
        const response = await axios.get("/api/code-of-conduct");
        if (response.data.pdfUrl) {
          setPdfUrl(response.data.pdfUrl);
        }
      } catch (error) {
        console.error("Failed to fetch code of conduct PDF:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPdfUrl();
  }, []);

  return (
    <main className="rv-14-body">
      <BreadcrumbSection title={t('title')} />

      <section className="pdf-viewer-section rv-section-spacing" style={{ paddingTop: 0 }}>
        <div className="container">
          <DivAnimateYAxis>
            <div className="rv-vision-section text-center mb-60">
              <p className="rv-vision-descr mx-auto">
                {t('description')}
              </p>
            </div>
          </DivAnimateYAxis>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">{t('loadingDocument')}</p>
            </div>
          ) : pdfUrl ? (
            <PdfViewer url={`/api/code-of-conduct/pdf?v=${Date.now()}`} />
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
               <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <FileText className="w-10 h-10 text-gray-300" />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('unavailableTitle')}</h3>
               <p className="text-gray-500 max-w-md mx-auto">
                 {t('unavailableDesc')}
               </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CodeOfConductPage;
