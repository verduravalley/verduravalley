'use client';
// 'use client' required: dynamic() with ssr:false (modals) needs client context in Turbopack
// FontAwesome is deferred via <head> link preload in locale/layout.tsx (not bundled here)

// Swiper CSS moved to component level (BannerSwiperClient, ProjectSection2, ProductDetailsImageSlider)
import '@/styles/scss/style.scss';

import dynamic from 'next/dynamic';
import ScrollToTop from '@/components/marketing/utils/ScrollToTop';
import WhatsAppButton from '@/components/marketing/utils/WhatsAppButton';

// Header/Footer: ssr:true — included in SSR output for SEO (links, nav visible to crawlers)
const HeaderSection = dynamic(
  () => import('@/components/marketing/header/HeaderSection'),
  { ssr: true }
);
const FooterSection = dynamic(
  () => import('@/components/marketing/footer/FooterSection'),
  { ssr: true }
);

// Modals: client-only (Redux state, portals) — ssr:false correct
const CartModal = dynamic(
  () => import('@/components/marketing/modal/CartModal'),
  { ssr: false }
);
const WishlistModal = dynamic(
  () => import('@/components/marketing/modal/WishlistModal'),
  { ssr: false }
);
const SearchFormModal = dynamic(
  () => import('@/components/marketing/modal/SearchFormModal'),
  { ssr: false }
);
const VideoModal = dynamic(
  () => import('@/components/marketing/modal/VideoModal'),
  { ssr: false }
);

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
      <HeaderSection />
      <main>{children}</main>
      <FooterSection
        style="rv-20-footer"
        logo="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png"
        footerContactStyle="rv-20-footer__contact-card"
        footerFormStyle="rv-20-footer-nwsltr__form"
      />

      <WhatsAppButton />

      {/* Global Modals */}
      <CartModal />
      <WishlistModal />
      <SearchFormModal />
      <VideoModal videoUrl="https://www.youtube.com/embed/b-5E5suKIAY?si=KAbRHsNOuo4JeZiV" />
    </>
  );
}
