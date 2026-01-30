import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeFromWishlist,
} from "@/store/features/wishlistSlice";
import ProductTable from "../product/ProductTable";
import DivAnimateYAxis from "../utils/DivAnimateYAxis";

const WishlistSection = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlist);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromWishlist(id));
  };

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
