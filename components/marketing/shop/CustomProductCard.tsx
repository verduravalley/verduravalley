'use client';

import { useState } from "react";
import CustomProductModal from "../modal/CustomProductModal";
import { useTranslations } from "next-intl";

const CustomProductCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const t = useTranslations('shop');

  return (
    <>
      <div
        className="rv-3-product rv-12-product custom-product-card"
        style={{
          position: 'relative',
          cursor: 'pointer',
          border: '2px dashed #2d6a4f',
          borderRadius: '10px',
          height: '78%',
          transition: 'all 0.3s ease',
          backgroundColor: '#f8fdf9',
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <div
          className="rv-3-product__img"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '30px 20px',
            height: '100%',
            background: 'transparent',
          }}
        >
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            backgroundColor: '#2d6a4f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}>
            <i className="fa-solid fa-plus" style={{ fontSize: '28px', color: 'white' }}></i>
          </div>

          <h5 style={{
            color: '#2d6a4f',
            fontWeight: 700,
            fontSize: '18px',
            marginBottom: '10px',
          }}>
            {t('customProductRequest')}
          </h5>

          <p style={{
            color: '#666',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '20px',
          }}>
            {t('customProductCardDesc')}
          </p>

          <span
            style={{
              backgroundColor: '#2d6a4f',
              color: 'white',
              padding: '10px 25px',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            {t('requestNow')}
          </span>
        </div>
      </div>

      <CustomProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default CustomProductCard;
