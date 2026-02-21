'use client';

import React, { useRef, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  position?: number;
  visible?: boolean;
};

const DivAnimateYAxis = ({
  children,
  className,
  duration,
  position,
  visible,
}: Props) => {
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
      className={className ?? ""}
      style={{
        transform: inView ? 'translateY(0)' : `translateY(${position ?? 60}px)`,
        opacity: inView ? 1 : (visible ? 1 : 0),
        transition: `transform ${duration ?? 1.2}s ease-in, opacity ${duration ?? 1.2}s ease-in`,
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

export default DivAnimateYAxis;
