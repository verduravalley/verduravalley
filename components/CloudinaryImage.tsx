import React, { forwardRef } from 'react';
import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  fill?: boolean;
}

const CloudinaryImage = forwardRef<HTMLImageElement, Props>(({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  style,
  priority = false,
  fill = false
}, ref) => {
  // Inject optimization parameters into the URL
  const cleanSrc = src?.trim();
  if (!cleanSrc) return null;

  const isCloudinary = cleanSrc.includes('cloudinary.com');
  const isExternal = cleanSrc.startsWith('http');
  
  let finalSrc = cleanSrc;

  // Next.js Image component requires relative paths to start with /
  if (!isExternal && !finalSrc.startsWith('/')) {
    finalSrc = `/${finalSrc}`;
  }

  if (isCloudinary) {
    // Determine a width for the w_ parameter
    const targetWidth = width ? width * 2 : 1200;

    // Check if we need to inject params
    if (!finalSrc.includes('f_auto,q_auto')) {
      finalSrc = finalSrc.replace(/\/upload\//, `/upload/f_auto,q_auto,w_${targetWidth},c_limit/`);
    } else {
        // If it already has f_auto,q_auto, preserve that but ensure width is applied if missing
        if (!finalSrc.includes('w_')) {
             finalSrc = finalSrc.replace('f_auto,q_auto', `f_auto,q_auto,w_${targetWidth},c_limit`);
        }
    }
  }

  return (
    <Image
      ref={ref}
      src={finalSrc}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={style}
      priority={priority}
      fill={fill}
      unoptimized={isCloudinary}
    />
  );
});

CloudinaryImage.displayName = 'CloudinaryImage';

export default CloudinaryImage;
