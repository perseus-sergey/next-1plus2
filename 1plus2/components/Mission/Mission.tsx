import { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import style from './Mission.module.css';

interface MissionProps {
  catButtonClicked: () => void;
  levelButtonClicked: () => void;
}

const Mission: FC<MissionProps> = ({ catButtonClicked, levelButtonClicked }) => {
  return (
    <section>
      <div className={style.centered}>
        <TextButton id="level" onClick={levelButtonClicked}>
          Рівні
        </TextButton>
        <TextButton id="step" onClick={catButtonClicked}>
          Категорії
        </TextButton>
      </div>
    </section>
  );
};

export default Mission;
