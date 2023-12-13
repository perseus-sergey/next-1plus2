import React, { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.css';

interface MonitorProps {
  minusPlus: string;
  n1: string;
  n2: string;
  answer: string;
}

const Monitor: FC<MonitorProps> = ({ minusPlus, n1, n2, answer }) => (
  <section className={styles.Monitor} data-testid="Monitor">
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
      <TextButton className="cancelButton" style={{ padding: '0 1rem' }}>
        {'<<<'}
      </TextButton>
    </div>
  </section>
);

export default Monitor;
