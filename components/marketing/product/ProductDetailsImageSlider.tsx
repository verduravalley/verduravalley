'use client';

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import CloudinaryImage from "@/components/CloudinaryImage";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

type Props = {
  images?: string[];
};

const ProductDetailsImageSlider = ({ images = [] }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const displayImages = images.length > 0 ? images : ["/assets/img/product/1.png"];

  return (
    <div className="rv-product-details__imgs">
      {/* Main Slider with custom nav buttons */}
      <div style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
        <Swiper
          onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
          loop={true}
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Thumbs]}
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
                  style={{ width: '80%', height: 'auto', objectFit: 'cover', borderRadius: '15px' }}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => mainSwiperRef.current?.slidePrev()}
              style={{
                position: 'absolute',
                top: '50%',
                left: '10px',
                transform: 'translateY(-50%)',
                zIndex: 50,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                color: '#2d6a4f',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="slider-btn-next"
              onClick={() => mainSwiperRef.current?.slideNext()}
              style={{
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 50,
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(255,255,255,0.9)',
                color: '#2d6a4f',
                fontSize: '14px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              }}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
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
        .slider-btn-next {
          right: 25%;
        }
        @media (max-width: 767px) {
          .slider-btn-next {
            right: 2%;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsImageSlider;
