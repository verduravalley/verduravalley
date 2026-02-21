'use client';

import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, ChevronLeft, ChevronRight, Download, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF worker — webpack/turbopack resolves this to the correct output URL
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  url: string;
}

const PdfViewer = ({ url }: PdfViewerProps) => {
  const t = useTranslations('codeOfConductPage');
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [transitioning, setTransitioning] = useState(false);
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

  const changePage = (delta: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setPageNumber(p => p + delta);
      setTransitioning(false);
    }, 300);
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="position-relative">
        {/* Left Arrow */}
        {pageNumber > 1 && (
          <button
            onClick={() => changePage(-1)}
            className="position-absolute top-50 start-0 translate-middle-y d-flex align-items-center justify-content-center"
            style={{
              width: '44px',
              height: '44px',
              zIndex: 10,
              marginLeft: '-22px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              opacity: 0.6,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            aria-label="Previous page"
          >
            <ChevronLeft style={{ color: '#2D6A4F', width: '28px', height: '28px' }} />
          </button>
        )}

        {/* PDF Document - 100% width */}
        <div
          className="shadow-lg border border-gray-200 bg-white w-100"
          style={{
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
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
            onClick={() => changePage(1)}
            className="position-absolute top-50 end-0 translate-middle-y d-flex align-items-center justify-content-center"
            style={{
              width: '44px',
              height: '44px',
              zIndex: 10,
              marginRight: '-22px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              opacity: 0.6,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
            aria-label="Next page"
          >
            <ChevronRight style={{ color: '#2D6A4F', width: '28px', height: '28px' }} />
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
