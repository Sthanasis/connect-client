import productService from '@/features/products/api';

export default async function Products() {
  const result = await productService.fetchAllProducts();
  return <div>Products Page {JSON.stringify(result.data)}</div>;
}
