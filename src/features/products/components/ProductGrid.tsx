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
      <div className="max-w-[1000px] flex-col flex md:flex-row gap-8 mx-auto">
        <div className="md:w-1/2">{images}</div>
        <div className="md:w-1/2">{info}</div>
      </div>
    </section>
  );
}
