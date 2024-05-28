import Image from "next/image";
import getBlurDataURL from "@/utils/blurDataURL";
import defaultImage from '@/public/images/placeholder.webp';

const ImageComponent = ({
  src,
  width,
  height,
  priority,
  fill,
  alt,
  sizes,
  ClassName,
  placeholder,
}) => {
  const blurDataURL = getBlurDataURL('your-image.jpg');
  const myLoader = () => {
    return `${src}`;
  };
  return (
    <Image
      loader={myLoader}
      src={`${src}`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      fill={fill}
      sizes={sizes}
      ClassName={ClassName}
      placeholder={placeholder}
      blurDataURL={placeholder === "blur" ? blurDataURL : undefined}
    />
  );
};

export default ImageComponent;
