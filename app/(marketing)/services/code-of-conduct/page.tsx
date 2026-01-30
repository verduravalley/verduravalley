'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import BreadcrumbSection from '@/components/marketing/breadcrumb/BreadcrumbSection';
import DivAnimateYAxis from '@/components/marketing/utils/DivAnimateYAxis';
import { FileText, Loader2, Download, ExternalLink } from 'lucide-react';

const CodeOfConductPage = () => {
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
      <BreadcrumbSection title="Code of Conduct" />

      {/* Live PDF Viewer Section */}
      <section className="pdf-viewer-section rv-section-spacing">
        <div className="container">
          {/* --- Our Vision --- */}
          <DivAnimateYAxis>
            <div className="rv-vision-section text-center mb-100">
              <div className="rv-1-section__heading justify-content-center">
                <h2 className="rv-1-section__title">Governance & Transparency</h2>
              </div>
              <p className="rv-vision-descr mx-auto">
                Review our latest impact reports, governance policies, and compliance documentation.
              </p>
            </div>
          </DivAnimateYAxis>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
              <p className="text-gray-500 font-medium">Loading Document...</p>
            </div>
          ) : pdfUrl ? (
            <>
              {/* Professional PDF Browser Mockup */}
              <div className="pdf-browser-wrapper shadow-lg rounded-xl overflow-hidden border border-gray-200" style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
                <div className="pdf-browser-header bg-gray-100 p-3 flex items-center border-b" style={{ backgroundColor: '#f3f4f6', padding: '0.75rem', display: 'flex', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
                  <div className="flex gap-2 mr-4" style={{ display: 'flex', gap: '0.5rem', marginRight: '1rem' }}>
                    <span className="w-3 h-3 rounded-full bg-red-400" style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#f87171' }}></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400" style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#facc15' }}></span>
                    <span className="w-3 h-3 rounded-full bg-green-400" style={{ width: '0.75rem', height: '0.75rem', borderRadius: '9999px', backgroundColor: '#4ade80' }}></span>
                  </div>
                  <div className="bg-white px-4 py-1 rounded text-xs text-gray-600 flex-grow max-w-md truncate" style={{ backgroundColor: 'white', padding: '0.25rem 1rem', borderRadius: '0.25rem', fontSize: '0.75rem', color: '#9ca3af', flexGrow: 1, maxWidth: '28rem' }}>
                    Code of Conduct
                  </div>
                </div>

                <iframe
                  src={`/api/code-of-conduct/pdf?v=${Date.now()}#view=FitH`}
                  title="Code of Conduct"
                  className="w-full h-[600px] md:h-[800px]"
                  style={{ width: '100%', height: '800px', border: 0 }}
                  frameBorder="0"
                />
              </div>

              <div className="text-center mt-30" style={{ marginTop: '30px' }}>
                <a href={`/api/code-of-conduct/pdf?v=${Date.now()}`} target="_blank" className="rv-14-service__btn flex items-center justify-center gap-2 mx-auto w-fit" rel="noreferrer">
                  Download Full Document <Download className="w-5 h-5" />
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
               <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <FileText className="w-10 h-10 text-gray-300" />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 mb-2">Document Unavailable</h3>
               <p className="text-gray-500 max-w-md mx-auto">
                 The Code of Conduct document is currently being updated. Please check back later or contact our support team.
               </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CodeOfConductPage;
