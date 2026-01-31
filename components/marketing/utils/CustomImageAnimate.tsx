import { motion } from "framer-motion";
import CloudinaryImage from "@/components/CloudinaryImage";
type Props = {
  className?: string;
  alt: string;
  src: string;
};

const MotionCloudinaryImage = motion(CloudinaryImage);

const CustomImageAnimate = ({ className, alt, src }: Props) => {
  return (
    <MotionCloudinaryImage
      src={src}
      alt={alt}
      width={600}
      height={800}
      className={className ? className : ""}
      initial={{
        scale: 1.2,
      }}
      whileInView={{
        scale: 1,
      }}
      transition={{
        duration: 1.2,
        ease: "easeIn",
      }}
      viewport={{ once: true }}
    />
  );
};

export default CustomImageAnimate;
