import Button from '@/shared/components/button/Button';
import ProductReview from './ProductReview';

interface ProductInfoProps {
  category: string;
  price: string;
  description: string;
  title: string;
  rating: number;
}

export default function ProductInfo({
  category,
  description,
  price,
  title,
  rating,
}: ProductInfoProps) {
  return (
    <section className="flex gap-4 flex-col text-sm">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div>
        <div className="flex h-5">
          <ProductReview totalPercentage={rating} />
        </div>
        <div className="font-thin tracking-wider flex gap-2">
          <span>{category}</span>
        </div>
      </div>
      <p className="text-lg">{description}</p>
      <div className="rounded-md border border-slate-gray px-6 py-4 flex flex-col gap-4">
        <h3 className="font-bold text-xl">{price}</h3>
        <span>Delivered on</span>
        <span className="font-bold">Transfer fee</span>
        <Button full variant="filled" color="primary">
          ADD TO CART
        </Button>
      </div>
    </section>
  );
}
