// Icon.tsx
import React from "react";
import Image from "next/image";

interface IconProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  src,
  alt,
  width = 80,
  height = 50,
  className = "icon",
}) => {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
    />
  );
};
