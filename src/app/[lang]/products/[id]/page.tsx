import productService from '@/features/products/api';
import reviewService from '@/features/products/api/reviewService';
import ProductGrid from '@/features/products/components/ProductGrid';
import ProductImageList from '@/features/products/components/ProductImageList';
import ProductInfo from '@/features/products/components/ProductInfo';
import ProductReviewList from '@/features/products/components/reviews/ProductReviewList';
import ProductReviewListHeader from '@/features/products/components/reviews/ProductReviewListHeader';
import { mapReviewResponse } from '@/features/products/mappers/mapReviewResponse';
import generateReviewProgress from '@/features/products/utilities/generateReviewProgress';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await productService.fetchProductById(id);
  const reviews = await reviewService.fetchReviewByProductId(id);
  const config = generateReviewProgress(reviews);
  return (
    <ProductGrid
      images={
        <ProductImageList
          images={product.images.map((img, i) => ({ id: i, url: img }))}
        />
      }
      info={
        <ProductInfo
          category={product.category}
          description={product.description}
          price={product.price + ' $'}
          title={product.name}
          ratingCount={product.reviewsCount}
          ratingPercentage={product.ratingPercentage}
        />
      }
      reviews={
        <ProductReviewList reviews={mapReviewResponse(reviews)}>
          <ProductReviewListHeader
            total={product.rating.toFixed(1)}
            percentage={product.ratingPercentage}
            reviewsMap={config}
          />
        </ProductReviewList>
      }
    ></ProductGrid>
  );
}
