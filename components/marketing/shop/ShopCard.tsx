'use client';

import { ShopItem } from "@/types";
import { Link } from "@/i18n/navigation";
import { useState } from "react";
import ProductContactModal from "../modal/ProductContactModal";
import { useTranslations } from "next-intl";
import CloudinaryImage from "@/components/CloudinaryImage";

import { useLocale } from "next-intl";

type Props = {
  img: string;
  name: string;
  prevPrice: number;
  price: number;
  discount?: boolean;
  slug: string;
  product: ShopItem;
  style?: string;
};

const ShopCard = ({
  img,
  name,
  prevPrice,
  price,
  discount,
  slug,
  product, // Added product here to access AR fields
  style,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('shop');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  
  const displayName = isRtl && product.name_ar ? product.name_ar : name;

  return (
    <div className={`rv-3-product rv-12-product ${style ? style : ""}`} style={{ position: 'relative' }}>
      <div className="rv-3-product__img rv-12-product__img">
        <CloudinaryImage src={img} alt="Product Image" width={400} height={400} />
        {discount && <span className="rv-3-product__tag">-20%</span>}
      </div>

      <div className="rv-3-product__txt">
        <h5 className="rv-3-product__title">
          <Link href={`/products/${slug}`}>
            {displayName}
            {/* Stretched link to make whole card clickable */}
            <span
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1
              }}
              aria-hidden="true"
            />
          </Link>
        </h5>

        <div className="rv-3-product__bottom">
          <span className="rv-3-product__price">
            <span className="prev-price">${prevPrice}</span>
            <span className="current-price">${price}</span>
          </span>

          <button
            className="rv-3-product__cart-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            style={{
              position: 'relative',
              zIndex: 2,
              backgroundColor: 'var(--rv-pr-1)',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {t('contactForMore')}
          </button>
        </div>
      </div>

      <ProductContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productInfo={{ name, slug }}
      />
    </div>
  );
};

export default ShopCard;
