'use client';

import { ShopItem } from "@/types";
import { useState } from "react";
import ProductContactModal from "../modal/ProductContactModal";

import { useLocale, useTranslations } from "next-intl";

type Props = {
  item: ShopItem;
};

const ProductDetailTop = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const t = useTranslations('shop');

  const category = isRtl && item.category_ar ? item.category_ar : item.category;

  return (
    <div className="rv-product-details__top-txt">
      {category && (
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#2d6a4f',
          background: '#d8f3dc',
          borderRadius: '20px',
          padding: '3px 12px',
          marginBottom: '10px',
        }}>
          {category}
        </span>
      )}
      <h2 className="rv-product-details__title">{isRtl && item.name_ar ? item.name_ar : item.name}</h2>

      <div
        className="rv-product-details__short-descr rte-content"
        dangerouslySetInnerHTML={{ __html: isRtl && item.product_info_ar ? item.product_info_ar : (item.product_info ?? '') }}
      />

      {/* <h4 className="rv-product-details__price">
        <span className="prev-price">${item.prevPrice}.00</span>
        <span className="current-price">${item.price}.00</span>
      </h4> */}

      <div className="rv-product-details__actions">
        <button
          className="rv-product-details__add-to-cart"
          onClick={() => setIsModalOpen(true)}
        >
          {t('contactForMore')}
        </button>
      </div>

      <ProductContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productInfo={{ name: isRtl && item.name_ar ? item.name_ar : item.name, slug: item.slug }}
      />
    </div>
  );
};

export default ProductDetailTop;
