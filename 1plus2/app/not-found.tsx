import TextButton from '@/components/TextButton/TextButton';
import { Title } from '@/components/Title/Title';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Title name="Page not found (404)" />
      <Link href="/">
        <TextButton isLink>Go to start page</TextButton>
      </Link>
    </>
  );
}
