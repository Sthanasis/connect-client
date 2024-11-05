import Button from '@/shared/components/button/Button';
import Image from 'next/image';

interface ProductProps {
  name: string;
  images: string[];
  description: string;
  price: number;
  category: string;
  rating: number;
  reviewsCount: number;
}

const ProductCard = ({
  category,
  name,
  price,
  rating,
  images,
  reviewsCount,
  description,
}: ProductProps) => {
  return (
    <section
      className="rounded-md flex flex-col overflow-hidden bg-snow-white text-dark-steel"
      role="button"
    >
      <div className="max-h-[200px]">
        <Image
          src={images[0]}
          width={200}
          height={100}
          style={{ width: 'auto', height: 'auto' }}
          priority
          alt={`Image of ${category}, named ${name}`}
        />
      </div>

      <div className="p-3 flex flex-col justify-between w-full bg-snow-white">
        <h2 className="font-bold text-xl">{name}</h2>
        <div className="flex flex-col gap-2">
          <p>{description}</p>
          <span className="font-serif text-lg text-primary">{price} $</span>
          <div className="flex items-center gap-2">
            <div className="bg-[url(/empty_star.svg)] bg-[0_50%] bg-repeat-x bg-[length:20%] h-full w-[100px]">
              <div
                className="bg-[url(/filled_star.svg)] bg-[0_50%] bg-repeat-x bg-[length:20%] h-full"
                style={{ width: rating }}
              />
            </div>
            <span className='before:content-["("] after:content-[")"] text-neutral-text'>
              {reviewsCount}
            </span>
          </div>

          <Button variant="filled" color="primary">
            ADD TO CART
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
