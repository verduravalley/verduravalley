'use client';

import { removeFromCart, updateQuantity } from "@/store/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "react-toastify";
import ProductTable from "../product/ProductTable";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import CouponForm from "../form/CouponForm";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const CartSection = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cart);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
    toast.warning("Product Removed From Cart!");
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container">
        <DivAnimateYAxis className="cart-section">
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <ShoppingCart style={{ width: 64, height: 64, color: '#d1d5db', margin: '0 auto 20px' }} />
            <h3 style={{ color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>Your cart is empty</h3>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>Looks like you haven&apos;t added anything yet.</p>
            <Link className="rv-1-banner-btn" href="/products">
              Browse Products
            </Link>
          </div>
        </DivAnimateYAxis>
      </div>
    );
  }

  return (
    <div className="container">
      <DivAnimateYAxis className="cart-section">
        <div className="row w-100 m-0 justify-content-center g-5">
          <div className="col-xl-9">
            <div className="cart-left inner-cart">
              <div className="cart-area">
                <div className="cart__body">
                  <ProductTable
                    items={cartItems}
                    handleRemoveItem={handleRemoveItem}
                    handleUpdateQuantity={handleUpdateQuantity}
                  />

                  <div className="cart-left-actions d-flex justify-content-end">
                    <CouponForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6 col-sm-8">
            <div className="cart-checkout-area">
              <h4 className="cart-checkout-area__title">Billing Summary</h4>

              <ul className="checkout-summary">
                <li>
                  <span className="checkout-summary__key">Subtotal</span>
                  <span className="checkout-summary__value">
                    <span>$</span>
                    {totalPrice}
                  </span>
                </li>

                <li>
                  <span className="checkout-summary__key">Shipping</span>
                  <span className="checkout-summary__value">
                    <span>$</span>10
                  </span>
                </li>

                <li>
                  <span className="checkout-summary__key">Coupon discount</span>
                  <span className="checkout-summary__value">
                    -<span>$</span>15
                  </span>
                </li>

                <li className="cart-checkout-total">
                  <span className="checkout-summary__key">Total</span>
                  <span className="checkout-summary__value">
                    <span>$</span>
                    {totalPrice - 5}
                  </span>
                </li>
              </ul>

              <Link
                href="/checkout"
                className="rv-1-banner-btn cart-checkout-btn"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </DivAnimateYAxis>
    </div>
  );
};

export default CartSection;
