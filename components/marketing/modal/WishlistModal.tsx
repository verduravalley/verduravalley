import ProductTable from "../product/ProductTable";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromWishlist,
} from "@/store/features/wishlistSlice";
import { toggleWishlistModalClose } from "@/store/features/wishlistModalSlice";
import Link from "next/link";

const WishlistModal = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist);
  const show = useAppSelector(
    (state) => state.wishlistModal.isWishlistModalOpen
  );

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

  const closeModal = () => {
    dispatch(toggleWishlistModalClose());
  };

  return (
    <>
      <div
        className={`rv-modal-overlay ${show ? "active" : ""}`}
        role="button"
        onClick={closeModal}
      ></div>
      <div className={`rv-modal-container ${show ? "active" : ""}`}>
        <div className="rv-modal-header">
          <h3>Wishlist Items</h3>
          <button onClick={closeModal}>
            <i className="fa-regular fa-x fa-fw"></i>
          </button>
        </div>
        <div className="cart-modal-body-container">
          <ProductTable
            items={wishlistItems}
            handleRemoveItem={handleRemoveItem}
          />
          <div className="cart-left-actions d-flex justify-content-between">
            <Link className="rv-1-banner-btn" href="/wishlist">
              View Wishlist
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistModal;
