'use client';

import { useRef, useEffect, useState } from "react";
import CloudinaryImage from "@/components/CloudinaryImage";

type Props = {
  className?: string;
  alt: string;
  src: string;
};

const CustomImageAnimate = ({ className, alt, src }: Props) => {
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
      style={{
        transform: inView ? "scale(1)" : "scale(1.2)",
        transition: "transform 1.2s ease-in",
        willChange: "transform",
        overflow: "hidden",
      }}
    >
      <CloudinaryImage
        src={src}
        alt={alt}
        width={600}
        height={800}
        className={className ?? ""}
      />
    </div>
  );
};

export default CustomImageAnimate;
