import { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import style from './Mission.module.css';

interface MissionProps {
  isHidden: boolean;
}

const Mission: FC<MissionProps> = ({ isHidden = true }) => {
  return (
    <section hidden={isHidden}>
      <div className={style.centered}>
        <TextButton id="level">Рівні</TextButton>
        <TextButton id="step">Категорії</TextButton>
      </div>
    </section>
  );
};

export default Mission;
