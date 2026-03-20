'use client';

import ProductDetailsImageSlider from "../product/ProductDetailsImageSlider";
import ProductDetailTop from "../product/ProductDetailTop";
import ProductDescription from "../product/ProductDescription";
import { ShopItem } from "@/types";
import { useLocale } from "next-intl";

type Props = {
  item: ShopItem;
};

const ProductDetailMain = ({ item }: Props) => {
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="rv-product-details" style={{ padding: '20px 0 80px' }}>
      <div className="container">
        <div className="row gx-lg-5 gy-3 align-items-start justify-content-center">
          <div className="col-lg-5 col-12 col-xxs-12">
            <ProductDetailsImageSlider images={item.images} />
          </div>

          <div className="col-lg-7 col-12 col-xxs-12">
            <ProductDetailTop item={item} />
          </div>

          <div className="col-12">
            <ProductDescription description={isRtl && item.description_ar ? item.description_ar : item.description} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailMain;
