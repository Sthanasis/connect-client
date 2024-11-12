import { ProductResponse } from '../types/productResponse';
import ProductCard from './ProductCard';

const ProductCardList = ({ products }: { products: ProductResponse[] }) => {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-2">Products</h1>
      <div className="flex gap-4 flex-wrap justify-center sm:justify-normal">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            category={product.category}
            images={product.images}
            name={product.name}
            price={product.price}
            rating={product.ratingPercentage}
            reviewsCount={product.reviewsCount}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCardList;
