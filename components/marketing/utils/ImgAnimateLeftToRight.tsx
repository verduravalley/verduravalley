'use client';

import { useRef, useEffect, useState } from 'react';

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const ImgAnimateLeftToRight = ({ src, alt, className }: Props) => {
  const ref = useRef<HTMLImageElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className ?? ''}
      style={{
        opacity: inView ? 1 : 0,
        clipPath: inView
          ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
          : 'polygon(0 0, 20% 0, 20% 100%, 0% 100%)',
        transform: inView ? 'scale(1)' : 'scale(1.2)',
        transition: 'opacity 1.2s ease-in, clip-path 1.2s ease-in, transform 1.2s ease-in',
        willChange: 'transform, opacity, clip-path',
      }}
    />
  );
};

export default ImgAnimateLeftToRight;
