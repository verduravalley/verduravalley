'use client';

// Bootstrap loaded conditionally (LTR/RTL) in [locale]/layout.tsx <head>

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Font Awesome
import '@/public/fontawesome/all.min.css';
import '@/public/fontawesome/sharp-regular.min.css';
import '@/public/fontawesome/sharp-solid.min.css';

// Custom SCSS
import '@/styles/scss/style.scss';

// Components - dynamic imports to avoid hydration mismatches
import dynamic from 'next/dynamic';

const HeaderSection = dynamic(
  () => import('@/components/marketing/header/HeaderSection'),
  { ssr: false }
);
const FooterSection = dynamic(
  () => import('@/components/marketing/footer/FooterSection'),
  { ssr: false }
);
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
      <HeaderSection />
      <main>{children}</main>
      <FooterSection
        style="rv-20-footer"
        logo="https://res.cloudinary.com/dh1mv7xlv/image/upload/v1768251104/organiyo/Logos/Verdura-Valley.png"
        footerContactStyle="rv-20-footer__contact-card"
        footerFormStyle="rv-20-footer-nwsltr__form"
      />

      {/* Global Modals */}
      <CartModal />
      <WishlistModal />
      <SearchFormModal />
      <VideoModal videoUrl="https://www.youtube.com/embed/b-5E5suKIAY?si=KAbRHsNOuo4JeZiV" />
    </>
  );
}
