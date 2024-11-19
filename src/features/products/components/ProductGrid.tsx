import { ReactNode } from 'react';

export default function ProductGrid({
  images,
  info,
}: {
  images: ReactNode;
  info: ReactNode;
}) {
  return (
    <section className="w-full h-full">
      <div className="max-w-[1000px] flex gap-8 mx-auto">
        <div className="w-1/2">{images}</div>
        <div className="w-1/2">{info}</div>
      </div>
    </section>
  );
}
