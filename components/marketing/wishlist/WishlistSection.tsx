'use client';

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromWishlist,
} from "@/store/features/wishlistSlice";
import ProductTable from "../product/ProductTable";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";
import Link from "next/link";
import { Heart } from "lucide-react";

const WishlistSection = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="container">
        <DivAnimateYAxis className="cart-section wishlist-section">
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <Heart style={{ width: 64, height: 64, color: '#d1d5db', margin: '0 auto 20px' }} />
            <h3 style={{ color: '#6b7280', fontWeight: 600, marginBottom: 8 }}>Your wishlist is empty</h3>
            <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 28 }}>Save products you love to your wishlist.</p>
            <Link className="rv-1-banner-btn" href="/products">
              Explore Products
            </Link>
          </div>
        </DivAnimateYAxis>
      </div>
    );
  }

  return (
    <div className="container">
      <DivAnimateYAxis className="cart-section wishlist-section">
        <div className="cart-left wishlist-inner-section">
          <div className="cart-area">
            <div className="cart__body">
              <ProductTable
                handleRemoveItem={handleRemoveItem}
                items={wishlistItems}
              />
            </div>
          </div>
        </div>
      </DivAnimateYAxis>
    </div>
  );
};

export default WishlistSection;
