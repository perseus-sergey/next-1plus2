import { ReactNode } from 'react';
import { Title } from './Title/Title';

const ArticleWrapper = ({ children, h1Title }: { children: ReactNode; h1Title?: ReactNode }) => {
  return (
    <>
      {h1Title && <Title name={h1Title} />}
      <article className="container max-w-screen-md flex flex-col items-center bg-slate-900/30 rounded-lg mx-auto p-4 my-4 text-white text-xl font-inter">
        {children}
      </article>
    </>
  );
};

export default ArticleWrapper;
