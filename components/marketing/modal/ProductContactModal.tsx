'use client';

import { useState } from "react";
import ContactForm from "../form/ContactForm";
import { useTranslations } from "next-intl";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productInfo: {
    name: string;
    slug: string;
  };
};

const ProductContactModal = ({ isOpen, onClose, productInfo }: Props) => {
  const t = useTranslations('shop');
  const tContact = useTranslations('contact');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => {
    onClose();
    setShowSuccess(false);
  };

  return (
    <>
      <div
        className={`rv-modal-overlay ${isOpen ? "active" : ""}`}
        role="button"
        onClick={handleClose}
        style={{ zIndex: 1000 }}
      ></div>
      <div
        className={`rv-modal-container ${isOpen ? "active" : ""}`}
        style={{
          maxWidth: '600px',
          width: '95%',
          zIndex: 1001,
          height: isOpen ? 'auto' : '0',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {showSuccess ? (
          <div className="rv-contact-modal" style={{ boxShadow: 'none' }}>
            <div className="rv-contact-modal__icon">
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <h3 className="rv-contact-modal__title">{tContact('thankYou')}</h3>
            <p className="rv-contact-modal__text">{tContact('receivedMessage')}</p>
            <button
              type="button"
              className="rv-contact-modal__btn"
              onClick={handleClose}
            >
              {tContact('okay')}
            </button>
          </div>
        ) : (
          <>
            <div className="rv-modal-header" style={{ padding: '0 0 20px' }}>
              <h3>{t('productInquiry')}</h3>
              <button
                onClick={handleClose}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-regular fa-xmark"></i>
              </button>
            </div>

            <div className="text-center mb-20">
              <p className="rv-contact-modal__text" style={{ fontSize: '15px' }}>
                {t('inquiringAbout')} <strong style={{ color: 'var(--rv-pr-1)' }}>{productInfo.name}</strong>
              </p>
            </div>

            <ContactForm innerPage isModal productInfo={productInfo} onSuccess={() => setShowSuccess(true)} />
          </>
        )}
      </div>
    </>
  );
};

export default ProductContactModal;
