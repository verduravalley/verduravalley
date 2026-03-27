'use client';

import { useLocale } from 'next-intl';

const WA_LINKS: Record<string, string> = {
  en: 'https://wa.link/3vnur5',
  ar: 'https://wa.link/z94s53',
};

export default function WhatsAppButton() {
  const locale = useLocale();
  const href = WA_LINKS[locale] ?? WA_LINKS.en;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        insetInlineEnd: '24px',
        zIndex: 9999,
        width: '52px',
        height: '52px',
        borderRadius: '50%',
        backgroundColor: '#25d366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.1)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 18px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.25)';
      }}
    >
      <i className="fa-brands fa-whatsapp" style={{ fontSize: '26px', color: '#fff' }}></i>
    </a>
  );
}
