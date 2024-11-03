import Button from '@/shared/button/Button';

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      Home page
      <div className="flex flex-col gap-3">
        <Button variant="outlined">{'test'}</Button>
        <Button variant="filled">{'test'}</Button>
        <Button variant="text">{'test'}</Button>
      </div>
    </div>
  );
}
