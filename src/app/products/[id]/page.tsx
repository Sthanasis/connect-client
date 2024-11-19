import productService from '@/features/products/api';
import ProductGrid from '@/features/products/components/ProductGrid';
import ProductImageList from '@/features/products/components/ProductImageList';
import ProductInfo from '@/features/products/components/ProductInfo';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await productService.fetchProductById(id);

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
          rating={product.ratingPercentage}
        />
      }
    ></ProductGrid>
  );
}
