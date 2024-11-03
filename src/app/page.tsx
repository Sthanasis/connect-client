import Button from '@/shared/button/Button';

export default function Home() {
  return (
    <div className="items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
      Home page
      <div className="flex flex-col gap-3">
        <Button color="primary" variant="outlined">
          {'TEST'}
        </Button>
        <Button color="primary" variant="filled">
          {'TEST'}
        </Button>
        <Button color="primary">{'TEST'}</Button>
      </div>
    </div>
  );
}
