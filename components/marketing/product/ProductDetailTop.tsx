import { ShopItem } from "@/types";
import { useState } from "react";
import ProductContactModal from "../modal/ProductContactModal";

type Props = {
  item: ShopItem;
};

const ProductDetailTop = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="rv-product-details__top-txt">
      <h2 className="rv-product-details__title">{item.name}</h2>

      <p className="rv-product-details__short-descr">
        {item.product_info}
      </p>

      <h4 className="rv-product-details__price">
        <span className="prev-price">${item.prevPrice}.00</span>
        <span className="current-price">${item.price}.00</span>
      </h4>

      <div className="rv-product-details__actions">
        <button
          className="rv-product-details__add-to-cart"
          onClick={() => setIsModalOpen(true)}
        >
          Contact for more
        </button>
      </div>

      <ProductContactModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productInfo={{ name: item.name, slug: item.slug }} 
      />
    </div>
  );
};

export default ProductDetailTop;
