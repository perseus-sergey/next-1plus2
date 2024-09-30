import styles from './TextButton.module.scss';

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLink?: boolean;
}

export default ({ children, className, isLink = false, ...attributes }: TextButtonProps) =>
  !isLink ? (
    <div className={styles.BtnWrapper}>
      <button
        className={className ? `${styles.TextButton} ${className}` : styles.TextButton}
        data-testid="TextButton"
        type="button"
        {...attributes}
      >
        {children}
      </button>
    </div>
  ) : (
    <div className={styles.BtnWrapper}>
      <span
        className={className ? `${styles.TextButton} ${className}` : styles.TextButton}
        data-testid="TextButton"
        {...attributes}
      >
        {children}
      </span>
    </div>
  );
