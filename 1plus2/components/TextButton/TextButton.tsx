import styles from './TextButton.module.css';

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default ({ children, className, ...attributes }: TextButtonProps) => (
  <button
    className={className ? `${styles.TextButton} ${className}` : styles.TextButton}
    data-testid="TextButton"
    type="button"
    {...attributes}
  >
    {children}
  </button>
);
