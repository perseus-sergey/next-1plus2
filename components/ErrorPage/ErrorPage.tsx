import styles from './ErrorPage.module.scss';
import TextButton from '../TextButton/TextButton';
import { Title } from '../Title/Title';

interface IErrorPageProps {
  error: Error & { digest?: string };
  resetFn: () => void;
}

const ErrorPage = ({ error, resetFn }: IErrorPageProps) => (
  <section className={styles.ErrorPage}>
    <Title name="Warning! Something went wrong!" />
    <h2>{error.message}</h2>
    <TextButton onClick={() => resetFn()}>Try again</TextButton>
  </section>
);

export default ErrorPage;
