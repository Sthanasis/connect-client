import productService from '@/features/products/api';
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
    <section>
      <ProductImageList
        images={product.images.map((img, i) => ({ id: i, url: img }))}
      />
      <ProductInfo
        category={product.category}
        description={product.description}
        price={product.price + '$'}
        title={product.name}
      />
    </section>
  );
}
