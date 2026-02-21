import { useTranslations, useLocale } from "next-intl";
import { stripDot } from "@/lib/stripDot";

type Props = {
  description?: string;
};

const ProductDescription = ({ description }: Props) => {
  const t = useTranslations('shop');
  const locale = useLocale();
  const isAr = locale === 'ar';
  return (
    <div className="rv-product-details__descr">
      <h6 className="rv-product-details-bottom__title">{stripDot(t('productDescription'), isAr)}</h6>
      <div 
        className="rv-product-details__long-descr"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      />
    </div>
  );
};

export default ProductDescription;
