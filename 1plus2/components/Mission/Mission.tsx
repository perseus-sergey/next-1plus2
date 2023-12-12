import TextButton from '../TextButton/TextButton';
import style from './Mission.module.css';

const Mission = () => {
  return (
    <section>
      <div className={style.centered}>
        <TextButton id="level">Рівні</TextButton>
        <TextButton id="step">Категорії</TextButton>
      </div>
    </section>
  );
};

export default Mission;
