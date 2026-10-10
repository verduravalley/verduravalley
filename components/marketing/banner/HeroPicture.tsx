import { getImageProps } from 'next/image';

const HERO_DESKTOP = '/assets/images/hero-cover.png';
const HERO_MOBILE = '/assets/images/hero-cover-mobile.png';

// Phones get a portrait shot: the wide 3:1 cover would be cropped down to its middle third
export default function HeroPicture() {
  const common = { alt: '', sizes: '100vw', loading: 'eager', fetchPriority: 'high' } as const;
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: HERO_DESKTOP, width: 2172, height: 724 });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: HERO_MOBILE, width: 1086, height: 1448 });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source media="(max-width: 767px)" srcSet={mobile} />
      <img
        {...rest}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      />
    </picture>
  );
}
