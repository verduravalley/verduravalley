'use client';

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import CloudinaryImage from "@/components/CloudinaryImage";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

type Props = {
  images?: string[];
};

const isVideoUrl = (url: string) =>
  /\.(mp4|webm|mov|ogg|avi)$/i.test(url) || url.includes('/video/upload/');

const ProductDetailsImageSlider = ({ images = [] }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages = images.length > 0 ? images : ["/assets/img/product/1.png"];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + displayImages.length) % displayImages.length));
  const nextLightbox = () => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % displayImages.length));

  return (
    <div className="rv-product-details__imgs">

      {/* ── Main Slider ── */}
      <div className="pds-main-wrap">
        <Swiper
          onSwiper={(swiper) => { mainSwiperRef.current = swiper; }}
          loop={displayImages.length > 1}
          spaceBetween={0}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Thumbs]}
          className="pds-main-swiper"
        >
          {displayImages.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="pds-slide-inner"
                onClick={() => openLightbox(index)}
                style={{ cursor: 'zoom-in' }}
              >
                {isVideoUrl(src) ? (
                  <video
                    src={src}
                    muted
                    playsInline
                    className="pds-media"
                  />
                ) : (
                  <CloudinaryImage
                    src={src}
                    alt={`Product Image ${index + 1}`}
                    width={1000}
                    height={1000}
                    className="pds-media"
                    priority={index === 0}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Nav arrows */}
        {displayImages.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              className="pds-nav pds-nav-prev"
              onClick={() => mainSwiperRef.current?.slidePrev()}
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              className="pds-nav pds-nav-next"
              onClick={() => mainSwiperRef.current?.slideNext()}
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {displayImages.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={8}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="pds-thumb-swiper"
        >
          {displayImages.map((src, index) => (
            <SwiperSlide key={index} className="pds-thumb-slide">
              <div className="pds-thumb-inner">
                {isVideoUrl(src) ? (
                  <>
                    <video
                      src={src}
                      muted
                      preload="metadata"
                      className="pds-thumb-media"
                    />
                    <span className="pds-thumb-play">
                      <i className="fa-solid fa-play" />
                    </span>
                  </>
                ) : (
                  <CloudinaryImage
                    src={src}
                    alt={`Thumb ${index + 1}`}
                    width={160}
                    height={160}
                    className="pds-thumb-media"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div className="pds-lightbox" onClick={closeLightbox}>
          <button className="pds-lb-btn pds-lb-close" onClick={closeLightbox} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>

          {displayImages.length > 1 && (
            <button
              className="pds-lb-btn pds-lb-prev"
              onClick={(e) => { e.stopPropagation(); prevLightbox(); }}
              aria-label="Previous"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
          )}

          <div className="pds-lb-content" onClick={(e) => e.stopPropagation()}>
            {isVideoUrl(displayImages[lightboxIndex]) ? (
              <video
                key={lightboxIndex}
                src={displayImages[lightboxIndex]}
                controls
                autoPlay
                playsInline
                className="pds-lb-img"
              />
            ) : (
              <CloudinaryImage
                src={displayImages[lightboxIndex]}
                alt={`Product Image ${lightboxIndex + 1}`}
                width={1400}
                height={1400}
                className="pds-lb-img"
              />
            )}
          </div>

          {displayImages.length > 1 && (
            <button
              className="pds-lb-btn pds-lb-next"
              onClick={(e) => { e.stopPropagation(); nextLightbox(); }}
              aria-label="Next"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>
          )}

          <span className="pds-lb-counter">
            {lightboxIndex + 1} / {displayImages.length}
          </span>
        </div>
      )}

      <style>{`
        /* ── Main wrapper ── */
        .pds-main-wrap {
          position: relative;
          width: 100%;
          margin-bottom: 10px;
        }

        /* ── Main slide inner: fixed-ratio box ── */
        .pds-slide-inner {
          width: 100%;
          aspect-ratio: 4 / 3;
          background: #f7f8f6;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Media (image & video) fills the box with contain ── */
        .pds-media {
          width: 100% !important;
          height: 100% !important;
          object-fit: contain !important;
          display: block;
        }

        /* ── Nav arrows ── */
        .pds-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 10;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.92);
          color: #2d6a4f;
          font-size: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.18);
          transition: background 0.2s, transform 0.2s;
        }
        .pds-nav:hover {
          background: #fff;
          transform: translateY(-50%) scale(1.08);
        }
        .pds-nav-prev { left: 10px; }
        .pds-nav-next { right: 10px; }

        /* ── Thumbnails ── */
        .pds-thumb-swiper {
          width: 100%;
          padding: 4px 0 !important;
        }
        .pds-thumb-slide {
          width: 72px !important;
          flex-shrink: 0;
        }
        @media (min-width: 576px) { .pds-thumb-slide { width: 84px !important; } }
        @media (min-width: 768px) { .pds-thumb-slide { width: 90px !important; } }

        .pds-thumb-inner {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          border-radius: 8px;
          overflow: hidden;
          background: #f0f2ef;
          border: 2px solid transparent;
          transition: border-color 0.2s;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pds-thumb-media {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          display: block;
        }
        .pds-thumb-play {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.35);
          color: #fff;
          font-size: 14px;
          pointer-events: none;
        }

        /* Active thumb highlight */
        .pds-thumb-swiper .swiper-slide-thumb-active .pds-thumb-inner {
          border-color: #2d6a4f;
        }

        /* ── Lightbox ── */
        .pds-lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.93);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pds-lb-content {
          max-width: 90vw;
          max-height: 88vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pds-lb-img {
          max-width: 90vw !important;
          max-height: 88vh !important;
          width: auto !important;
          height: auto !important;
          object-fit: contain !important;
          border-radius: 8px;
          display: block;
        }
        .pds-lb-btn {
          position: absolute;
          border: none;
          border-radius: 50%;
          background: rgba(255,255,255,0.13);
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .pds-lb-btn:hover { background: rgba(255,255,255,0.25); }
        .pds-lb-close  { top: 18px; right: 18px; width: 40px; height: 40px; font-size: 18px; }
        .pds-lb-prev   { left: 18px; top: 50%; transform: translateY(-50%); width: 46px; height: 46px; font-size: 18px; }
        .pds-lb-next   { right: 18px; top: 50%; transform: translateY(-50%); width: 46px; height: 46px; font-size: 18px; }
        .pds-lb-counter {
          position: absolute;
          bottom: 18px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255,255,255,0.55);
          font-size: 13px;
          letter-spacing: 0.04em;
        }

        /* ── Responsive: taller box on desktop ── */
        @media (min-width: 992px) {
          .pds-slide-inner { aspect-ratio: 3 / 2; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsImageSlider;
