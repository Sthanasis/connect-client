interface ProductInfoProps {
  category: string;
  price: string;
  description: string;
  title: string;
}

export default function ProductInfo({
  category,
  description,
  price,
  title,
}: ProductInfoProps) {
  return (
    <section>
      <div>
        <span>{category}</span>
        <span>{price}</span>
      </div>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
