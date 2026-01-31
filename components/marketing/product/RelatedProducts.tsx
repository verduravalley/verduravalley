import Link from "next/link";
import { useAppSelector } from "@/store/hooks";
import ShopCard from "../shop/ShopCard";
import { useTranslations } from "next-intl";

const RelatedProducts = () => {
  const { shopData } = useAppSelector((state) => state.shop);
  const t = useTranslations('shop');

  if (shopData.length === 0) return null;

  return (
    <section className="rv-related-prod rv-section-spacing">
      <div className="container">
        <div className="rv-3-section-heading rv-related-prod-heading">
          <div className="rv-3-section-heading__left">
            <h6 className="rv-7-section__sub-title">{t('newCollection')}</h6>
            <h2 className="rv-related-prod__title">{t('featuredProducts')}</h2>
          </div>

          <div className="rv-3-section-heading__right">
            <Link href="/products" className="rv-3-def-btn rv-12-banner__btn">
              {t('shopAllProducts')}
            </Link>
          </div>
        </div>

        <div className="row rv-related-prod-row g-30 justify-content-center rv-12-product--2">
          {shopData.slice(0, 4).map((item) => (
            <div className="col-xl-3 col-md-4 col-6 col-xxs-12" key={item.id}>
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
    </section>
  );
};

export default RelatedProducts;
