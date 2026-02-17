'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslations } from 'next-intl';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import DivAnimateYAxis from '@/components/marketing/utils/DivAnimateYAxis';
import { FileText, Loader2, Download, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CodeOfConductPage = () => {
  const t = useTranslations('codeOfConductPage');
  const [pdfUrl, setPdfUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Responsive scaling
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
        // Auto-scale for mobile
        if (window.innerWidth < 768) {
             setScale(window.innerWidth / 650); // Approximate A4 width ratio
        }
      }
    };
    
    window.addEventListener('resize', updateWidth);
    updateWidth();
    
    return () => window.removeEventListener('resize', updateWidth);
  }, []);


  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <main className="rv-14-body">
      <BreadcrumbSection title={t('title')} />

      <section className="pdf-viewer-section rv-section-spacing">
        <div className="container" ref={containerRef}>
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
            <div className="flex flex-col items-center">
              {/* PDF Controls */}
              <div className="flex items-center gap-4 mb-6 bg-gray-100 p-3 rounded-full shadow-sm flex-wrap justify-center">
                <button 
                  onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="p-2 hover:bg-white rounded-full disabled:opacity-50 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">
                  {pageNumber} / {numPages || '--'}
                </span>
                <button 
                  onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="p-2 hover:bg-white rounded-full disabled:opacity-50 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <div className="w-px h-6 bg-gray-300 mx-2 hidden sm:block"></div>
                
                <button 
                   onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                   className="p-2 hover:bg-white rounded-full transition-colors hidden sm:block"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-sm font-medium w-12 text-center hidden sm:block">{Math.round(scale * 100)}%</span>
                <button 
                   onClick={() => setScale(s => Math.min(2.0, s + 0.1))}
                   className="p-2 hover:bg-white rounded-full transition-colors hidden sm:block"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* PDF Document */}
              <div className="shadow-2xl border border-gray-200 bg-white" style={{ minHeight: '500px' }}>
                <Document
                  file={`/api/code-of-conduct/pdf?v=${Date.now()}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div className="flex items-center justify-center h-96 w-full">
                       <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
                    </div>
                  }
                  error={
                    <div className="p-10 text-center">
                       <p className="text-red-500 mb-4">{t('unavailableDesc')}</p>
                       <a href={`/api/code-of-conduct/pdf?v=${Date.now()}`} target="_blank" className="text-green-600 underline font-medium">
                         {t('downloadFull')}
                       </a>
                    </div>
                  }
                >
                  <Page 
                    pageNumber={pageNumber} 
                    scale={scale} 
                    width={containerWidth ? Math.min(containerWidth, 800) : undefined}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="max-w-full"
                  />
                </Document>
              </div>

               {/* Mobile Page Indicator/Controls */}
               <div className="mt-6 flex flex-col items-center gap-4">
                  <p className="text-sm text-gray-500 sm:hidden">
                    {pageNumber} of {numPages}
                  </p>

                  <a 
                    href={`/api/code-of-conduct/pdf?v=${Date.now()}`} 
                    target="_blank" 
                    className="rv-14-service__btn flex items-center justify-center gap-2"
                    rel="noreferrer"
                  >
                    {t('downloadFull')} <Download className="w-5 h-5" />
                  </a>
               </div>
            </div>
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
