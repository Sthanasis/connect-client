import Button from '@/shared/components/button/Button';
import Image from 'next/image';

interface ProductProps {
  name: string;
  images: string[];
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
  reviewsCount,
}: ProductProps) => {
  return (
    <section
      className="rounded-md flex flex-col overflow-hidden bg-snow-white"
      role="button"
    >
      <div className="max-h-[200px]">
        <Image
          src="https://i.pinimg.com/564x/c1/1d/16/c11d164de692594acf53c9a855093139.jpg"
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
          <span className="font-serif text-lg text-primary">{price} $</span>
          <div className="flex items-center gap-2">
            <div className="bg-[url(/empty_star.svg)] bg-[0_50%] bg-repeat-x bg-[length:20px] h-4 w-[100px]">
              <div
                className="bg-[url(/filled_star.svg)] bg-[0_50%] bg-repeat-x bg-[length:20px] h-4"
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
