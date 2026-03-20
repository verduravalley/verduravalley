import { useTranslations, useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";

type Props = {
  description?: string;
};

const ProductDescription = ({ description }: Props) => {
  const t = useTranslations('shop');
  const locale = useLocale();
  const isAr = locale === 'ar';

  if (!description?.trim()) return null;

  return (
    <div style={{
      borderTop: '1px solid #e8f5e9',
      paddingTop: '20px',
      marginTop: '8px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{
          display: 'inline-block',
          width: '3px',
          height: '16px',
          background: '#2d6a4f',
          borderRadius: '2px',
          flexShrink: 0,
        }} />
        <h6 style={{
          margin: 0,
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#2d6a4f',
        }}>
          {stripDot(t('productDescription'), isAr)}
        </h6>
      </div>
      <div
        dir={isAr ? 'rtl' : 'ltr'}
        dangerouslySetInnerHTML={{ __html: description }}
        className="rte-content"
        style={{
          fontSize: '14px',
          lineHeight: '1.8',
          color: '#4b5563',
        }}
      />
    </div>
  );
};

export default ProductDescription;
