import React, { FC } from 'react';
import TextButton from '../TextButton/TextButton';
import styles from './Monitor.module.css';

interface MonitorProps {
  isHidden: boolean;
}

const Monitor: FC<MonitorProps> = ({ isHidden = true }) => (
  <section className={styles.Monitor} data-testid="Monitor" hidden={isHidden}>
    {/* <section className="computer" hidden> */}
    <div className="display-wrapper">
      <div id="display">
        <table id="column_exs" hidden>
          <tr>
            <td className="mp" rowSpan={2}></td>
            <td className="n1"></td>
          </tr>
          <tr>
            <td className="n2"></td>
          </tr>
          <tr>
            <td colSpan={2} className="ans"></td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div className="prog_block">
        <div className="progressbar">progress..</div>
        <span className="progressbar_span"></span>
      </div>
      <TextButton hidden>⋖⋖⋖⋖</TextButton>
    </div>
  </section>
);

export default Monitor;
