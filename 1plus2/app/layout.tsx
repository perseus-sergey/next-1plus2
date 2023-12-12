import type { Metadata } from 'next';
// import { Montserrat } from 'next/font/google';
import './globals.css';

// const montserrat = Montserrat({
//   subsets: ['latin', 'cyrillic'],
//   weight: '400',
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: '1plus2 Fan',
  description:
    'Interactive resources online, homeworks, exam and revision help. Useful for teachers, pupils and parents.',
  keywords:
    'education, online, children, teaching, resources, teachers, interactive, whiteboard, smartboard, parents, learning, numbers, play, games, count, help, schools, worksheets curriculum, homework help, maths, mathematics, infants, primary, junior, elementary, secondary, assessment, free',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
      {/* <body className={montserrat.className}>{children}</body> */}
    </html>
  );
}
