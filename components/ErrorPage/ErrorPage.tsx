import styles from './ErrorPage.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';
import { SeoSVG } from '../Svg/SeoSVG';

interface IErrorPageProps {
  resetFn: () => void;
}

const ErrorPage = ({ resetFn }: IErrorPageProps) => (
  <section className={styles.ErrorPage}>
    <Title name="Warning! Something went wrong!" />
    <SeoSVG className="w-28 h-28 text-blue-100">
      <g fill="none" stroke="currentColor" stroke-linejoin="round">
        <path
          stroke-width="2"
          d="M2 14.5A4.5 4.5 0 0 0 6.5 19h12a3.5 3.5 0 0 0 .5-6.965a7 7 0 0 0-13.76-1.857A4.5 4.5 0 0 0 2 14.5Z"
        />
        <path stroke-width="3" d="M12 15.5h.01v.01H12z" />
        <path strokeLinecap="round" stroke-width="2" d="M12 12V9" />
      </g>
    </SeoSVG>
    <TextButton onClick={() => resetFn()}>Try again</TextButton>
  </section>
);

export default ErrorPage;
