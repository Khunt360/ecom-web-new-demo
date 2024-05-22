import Image from "next/image";

const ImageComponent = ({
  src,
  width,
  height,
  priority,
  fill,
  alt,
  sizes,
  ClassName,
}) => {
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
    />
  );
};

export default ImageComponent;
