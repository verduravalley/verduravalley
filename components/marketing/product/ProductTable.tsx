'use client';

import Link from "next/link";
import { ShopItem } from "@/types";
import { useState } from "react";
import { useLocale } from "next-intl";
import ProductContactModal from "../modal/ProductContactModal";
import CloudinaryImage from "@/components/CloudinaryImage";

type Props = {
  items: ShopItem[];
  handleRemoveItem: (id: number) => void;
  handleUpdateQuantity?: (id: number, quantity: number) => void;
};

const ProductTable = ({
  items,
  handleRemoveItem,
  handleUpdateQuantity,
}: Props) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [selectedProduct, setSelectedProduct] = useState<{name: string, slug: string} | null>(null);

  return (
    <div className="table-responsive rv-scrollbar">
      <table className="cart-page-table">
        <tbody>
          <tr>
            <th>Product</th>
            <th>Price</th>
            {handleUpdateQuantity && <th>Quantity</th>}
            <th>{handleUpdateQuantity ? "Total" : "Action"}</th>
            <th>Remove</th>
          </tr>
          {items?.length === 0 ? (
            <tr className="no-item-msg">
              <td className="no-item-msg-text">No items found</td>
            </tr>
          ) : (
            items.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    <div className="cart-product">
                      <div className="cart-product__img">
                        <CloudinaryImage src={item.img} alt="Product Image" width={100} height={100} />
                      </div>
                      <div className="cart-product__txt">
                        <h6>
                          <Link href={`/products/${item.slug}`}>{item.name}</Link>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>${item.price}</td>
                  {handleUpdateQuantity && (
                    <td>
                      <div className="cart-product__quantity">
                        <div className="cart-product__quantity-btns">
                          <button
                            className="cart-product__minus"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <i className="fa-light fa-minus"></i>
                          </button>
                          <button
                            className="cart-product__plus"
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <i className="fa-light fa-plus"></i>
                          </button>
                        </div>
                        <input
                          type="number"
                          name="product-quantity-input"
                          className="cart-product-quantity-input"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            handleUpdateQuantity(
                              item.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                    </td>
                  )}
                  <td>
                    {handleUpdateQuantity ? (
                      `${item.price * item.quantity}`
                    ) : (
                      <div className="rv-wishlist-action">
                        <button
                          className="rv-add-to-cart-btn rv-1-banner-btn rv-wishlist-action-btn"
                          onClick={() => setSelectedProduct({ name: isRtl && item.name_ar ? item.name_ar : item.name, slug: item.slug })}
                        >
                          Contact for more
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      className="item-remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <i className="fa-light fa-xmark"></i>
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {selectedProduct && (
        <ProductContactModal 
          isOpen={true} 
          onClose={() => setSelectedProduct(null)} 
          productInfo={selectedProduct} 
        />
      )}
    </div>
  );
};

export default ProductTable;
