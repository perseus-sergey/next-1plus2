import React, { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.css';

interface MonitorProps {
  isHidden: boolean;
  isDelButtonHidden: boolean;
  minusPlus: string;
  n1: string;
  n2: string;
  answer: string;
}

const Monitor: FC<MonitorProps> = ({
  isHidden = true,
  isDelButtonHidden = true,
  minusPlus,
  n1,
  n2,
  answer,
}) => (
  <section className={styles.Monitor} data-testid="Monitor" hidden={isHidden}>
    {/* <section className="computer" hidden> */}
    <div className={styles.displayWrapper}>
      <div className={styles.display} id="display">
        <table className={styles.columnExs} hidden={false}>
          <tbody>
            <tr>
              <td className={styles.minusPlus} rowSpan={2}>
                {minusPlus}
              </td>
              <td>{n1}</td>
            </tr>
            <tr>
              <td>{n2}</td>
            </tr>
            <tr>
              <td colSpan={2}>{answer}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div className={styles.infoBlock}>
      <div className={styles.progressBlock}>
        <div className={styles.progressBar}>progress..</div>
      </div>
      <TextButton hidden={isDelButtonHidden}>⋖⋖⋖⋖</TextButton>
    </div>
  </section>
);

export default Monitor;
