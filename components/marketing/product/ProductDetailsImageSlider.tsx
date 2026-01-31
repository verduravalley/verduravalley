import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import CloudinaryImage from "@/components/CloudinaryImage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

type Props = {
  images?: string[];
};

const ProductDetailsImageSlider = ({ images = [] }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const displayImages = images.length > 0 ? images : ["/assets/img/product/1.png"];

  return (
    <div className="rv-product-details__imgs">
      {/* Main Slider */}
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        } as React.CSSProperties}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="rv-product-details__img-main mb-20"
      >
        {displayImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="rv-product-details__img">
              <CloudinaryImage
                src={img}
                alt={`Product Image ${index + 1}`}
                width={800}
                height={800}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '15px' }}
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="rv-product-details__img-thumb"
        >
          {displayImages.map((img, index) => (
            <SwiperSlide key={index} className="cursor-pointer">
              <div className="rv-product-details__img-thumb-item">
                <CloudinaryImage
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  width={150}
                  height={150}
                  style={{ 
                    width: '100%', 
                    aspectRatio: '1/1', 
                    objectFit: 'cover', 
                    borderRadius: '10px',
                    border: '2px solid transparent'
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style>{`
        .rv-product-details__img-thumb .swiper-slide-thumb-active img {
          border-color: var(--rv-pr-1) !important;
        }
        .cursor-pointer {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsImageSlider;
