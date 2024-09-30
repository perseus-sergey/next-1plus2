import styles from './FlyingDigits.module.scss';

const getFlyingDigits = () =>
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
    .sort(() => Math.random() - 0.5)
    .map((dig, i) => ({
      title: dig,
      style: {
        marginLeft: `${Math.floor(Math.random() * 80) + 5}vw`,
        fontSize: `${Math.floor(Math.random() * 6) + 2}em`,
        animationDelay: i % 2 ? '0s' : `${Math.floor(Math.random() * 11)}s`,
        animationDuration: i % 2 ? `${Math.floor(Math.random() * 20) + 10}s` : '25s',
      },
    }));

const FlyingDigits = () => (
  <ul className={styles.FlyingDigits} data-testid="FlyingDigits">
    {getFlyingDigits().map((digit) => (
      <li style={digit.style} key={digit.title}>
        {digit.title}
      </li>
    ))}
  </ul>
);

export default FlyingDigits;
