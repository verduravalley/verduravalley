import { ShopItem } from "@/types";
import ShopCard from "./ShopCard";
import CustomProductCard from "./CustomProductCard";
type Props = {
  currentItems: ShopItem[];
  isGridView: boolean;
};
const ShopGridInnerProduct = ({ currentItems, isGridView }: Props) => {
  return (
    <div className="rv-inner-products-container rv-12-product--2">
      <div className="row row-cols-xl-4 row-cols-md-3 row-cols-2 row-cols-xxs-1 g-30">
        <div className={`col ${isGridView ? "" : "list-view-on"}`}>
          <CustomProductCard />
        </div>
        {currentItems.map((item) => (
          <div
            className={`col ${isGridView ? "" : "list-view-on"}`}
            key={item.id}
          >
            <ShopCard
              img={item.img}
              name={item.name}
              prevPrice={item.prevPrice}
              price={item.price}
              discount={item.discount}
              slug={item.slug}
              product={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopGridInnerProduct;
