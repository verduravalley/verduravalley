'use client';

import { ReactNode, useRef, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

const BounceAnimatedBtn = ({ children, className }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 0.4s ease-in, transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export default BounceAnimatedBtn;
