import { ReactNode } from 'react';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import ArticleWrapper from './ArticleWrapper';

const ArticleWithImage = ({
  titleH1,
  imgAlt,
  imgSrc,
  innerHtml,
}: {
  titleH1?: ReactNode;
  imgSrc: StaticImport;
  imgAlt: string;
  innerHtml: ReactNode;
}) => {
  return (
    <ArticleWrapper h1Title={titleH1}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Image
          className="shrink-0 sm:rounded-full sm:border-zinc-300 sm:border-4"
          src={imgSrc}
          alt={imgAlt}
          priority
        />
        {innerHtml}
      </div>
    </ArticleWrapper>
  );
};

export default ArticleWithImage;
