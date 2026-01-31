import { useTranslations } from "next-intl";

type Props = {
  description?: string;
};

const ProductDescription = ({ description }: Props) => {
  const t = useTranslations('shop');
  return (
    <div className="rv-product-details__descr">
      <h6 className="rv-product-details-bottom__title">{t('productDescription')}</h6>
      <div 
        className="rv-product-details__long-descr"
        dangerouslySetInnerHTML={{ __html: description || "" }}
      />
    </div>
  );
};

export default ProductDescription;
