import Button from '@/shared/components/button/Button';
import ProductReviewStars from './ProductReviewStars';
import ProgressBar from '@/shared/components/progressBar/ProgressBar';

interface ProductReviewListHeaderProps {
  reviewsMap: Map<number, { total: number; percentage: number }>;
  total: string;
  percentage: number;
}

export default function ProductReviewListHeader({
  reviewsMap,
  total,
  percentage,
}: ProductReviewListHeaderProps) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      <div className="flex mb-8 gap-4">
        <div className="flex flex-col justify-center items-center gap-s w-fit">
          <span className="font-bold">{total}</span>
          <div className="h-10">
            <ProductReviewStars totalPercentage={percentage} />
          </div>
          <Button variant="filled" color="primary">
            Review this Product
          </Button>
        </div>
        <div className="flex flex-col justify-between">
          {Array.from(reviewsMap || []).map(([review, config]) => (
            <div
              key={review}
              className="flex justify-between gap-2 items-center"
            >
              <span className="text-neutral-text min-w-3">{review}</span>
              <span className="text-neutral-text">stars</span>
              <div className="w-40">
                <ProgressBar progress={config.percentage} />
              </div>
              <span className="text-neutral-text">{config.total}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
