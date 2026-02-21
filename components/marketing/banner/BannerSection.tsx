'use client';

import dynamic from 'next/dynamic';
import BannerStaticFallback from './BannerStaticFallback';

// Swiper loads as a separate chunk after initial paint — reduces TBT significantly.
// BannerStaticFallback is rendered on server (SSR) and shown while Swiper JS loads,
// providing an <Image priority> for LCP detection and a seamless visual transition.
const BannerSwiperClient = dynamic(() => import('./BannerSwiperClient'), {
  ssr: false,
  loading: () => <BannerStaticFallback />,
});

export default function BannerSection() {
  return <BannerSwiperClient />;
}
