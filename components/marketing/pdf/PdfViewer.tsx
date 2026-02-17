'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerProps {
  url: string;
}

const PdfViewer = ({ url }: PdfViewerProps) => {
  const t = useTranslations('codeOfConductPage');
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
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
    <div className="container" ref={containerRef}>
      <div className="position-relative">
        {/* Left Arrow */}
        {pageNumber > 1 && (
          <button 
            onClick={() => setPageNumber(p => p - 1)}
            className="position-absolute top-50 start-0 translate-middle-y btn btn-light rounded-circle shadow-sm"
            style={{ 
              width: '50px', 
              height: '50px', 
              zIndex: 10,
              border: '2px solid #2D6A4F',
              marginLeft: '-25px'
            }}
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" style={{ color: '#2D6A4F' }} />
          </button>
        )}

        {/* PDF Document - 100% width */}
        <div className="shadow-lg border border-gray-200 bg-white w-100">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '500px' }}>
                 <Loader2 className="text-success mb-3" style={{ width: '3rem', height: '3rem' }} />
                 <span className="text-muted">Loading PDF...</span>
              </div>
            }
            error={
              <div className="p-5 text-center">
                 <FileText className="text-muted mb-3 mx-auto" style={{ width: '3rem', height: '3rem' }} />
                 <p className="text-danger mb-3">{t('unavailableDesc')}</p>
                 <a href={url} target="_blank" className="btn btn-success" rel="noreferrer">
                   {t('downloadFull')}
                 </a>
              </div>
            }
          >
            <Page 
              pageNumber={pageNumber}
              width={containerWidth || undefined}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="w-100"
            />
          </Document>
        </div>

        {/* Right Arrow */}
        {pageNumber < numPages && (
          <button 
            onClick={() => setPageNumber(p => p + 1)}
            className="position-absolute top-50 end-0 translate-middle-y btn btn-light rounded-circle shadow-sm"
            style={{ 
              width: '50px', 
              height: '50px', 
              zIndex: 10,
              border: '2px solid #2D6A4F',
              marginRight: '-25px'
            }}
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" style={{ color: '#2D6A4F' }} />
          </button>
        )}
      </div>

      {/* Page indicator and download button */}
      <div className="mt-4 d-flex flex-column align-items-center gap-3">
        <p className="text-muted small mb-0">
          Page {pageNumber} of {numPages}
        </p>

        <a 
          href={url} 
          target="_blank" 
          className="rv-14-service__btn d-flex align-items-center gap-2"
          rel="noreferrer"
        >
          <Download style={{ width: '1.25rem', height: '1.25rem' }} />
          {t('downloadFull')}
        </a>
      </div>
    </div>
  );
};

export default PdfViewer;
