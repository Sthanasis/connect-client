'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ProductImagesListProps {
  images: {
    id: number;
    url: string;
  }[];
}

const ProductImageList = ({ images }: ProductImagesListProps) => {
  const [image, setImage] = useState(images[0]);

  return (
    <div className="flex-col flex md:flex-row gap-1">
      <div className="flex md:flex-col gap-1">
        {images.map((img) => (
          <button
            className={[
              'border',
              img.id === image.id ? 'border-dark-steel' : '',
            ].join(' ')}
            key={img.id}
            onClick={() => setImage(img)}
          >
            <Image
              alt="main image"
              src={img.url}
              width={40}
              height={40}
              style={{ width: 'auto', height: 'auto' }}
            />
          </button>
        ))}
      </div>
      <div className="h-96 w-96 relative border">
        <Image
          priority
          alt="main image"
          src={image.url}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default ProductImageList;
