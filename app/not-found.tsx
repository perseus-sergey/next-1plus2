import { Header } from '@/components/Header/Header';
import { SeoSVG } from '@/components/Svg/SeoSVG';
import TextButton from '@/components/TextButton/TextButton';
import { Title } from '@/components/Title/Title';
import { ELang } from '@models/types';
import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang={ELang.en}>
      <body suppressHydrationWarning={true} className="bg-slate-950">
        <Header />
        <main className="flex-1 flex flex-col justify-around items-center px-1 sm:px-4">
          <Title name="Page not found (404)" />
          <SeoSVG viewBox="0 0 14 14" className="h-40 w-40 text-sky-200">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2.63 8.13C.85 10.49.05 12.53.76 13.24c1 1 4.6-1 8-4.44s5.44-7 4.44-8c-.64-.65-2.38 0-4.47 1.41"></path>
              <path d="M12.05 4.92A5 5 0 0 1 7.5 12a5.06 5.06 0 0 1-1.95-.39M3.5 10a5 5 0 0 1 7-7"></path>
            </g>
          </SeoSVG>
          <Link href="/">
            <TextButton isLink>Go to start page</TextButton>
          </Link>
        </main>
      </body>
    </html>
  );
}
