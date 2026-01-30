import ContactForm from "../form/ContactForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productInfo: {
    name: string;
    slug: string;
  };
};

const ProductContactModal = ({ isOpen, onClose, productInfo }: Props) => {
  return (
    <>
      <div 
        className={`rv-modal-overlay ${isOpen ? "active" : ""}`}
        role="button"
        onClick={onClose}
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
        <div className="rv-modal-header" style={{ padding: '0 0 20px' }}>
          <h3>Product Inquiry</h3>
          <button 
            onClick={onClose}
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
            Inquiring about: <strong style={{ color: 'var(--rv-pr-1)' }}>{productInfo.name}</strong>
          </p>
        </div>

        <ContactForm innerPage isModal productInfo={productInfo} />
      </div>
    </>
  );
};

export default ProductContactModal;
