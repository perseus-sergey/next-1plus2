import React, { FC } from 'react';
import styles from './MathCategories.module.css';

interface MathCategoriesProps {}

const MathCategories: FC<MathCategoriesProps> = () => (
  <section className={styles.MathCategories} data-testid="MathCategories">
    <div className="keyboard-line">
      <button className="glass-button category" type="button" id="sequence">
        1 2 ?
      </button>
      <button className="glass-button category" type="button" id="equality">
        1 + 2
      </button>
      <button className="glass-button category" type="button" id="pairs">
        1 + 1
      </button>
      <button className="glass-button category" type="button" id="linkEquality">
        1 + ?
      </button>
      <button className="glass-button category" type="button" id="inequality">
        ⋖ ⋗
      </button>
      <button className="glass-button category" type="button" id="equalTen">
        1 + 10
      </button>
      <button className="glass-button category" type="button" id="composition">
        Склад 11..19
      </button>
      <button className="glass-button category" type="button" id="equalFive">
        10 + 5
      </button>
      <button className="glass-button category" type="button" id="equalOverTen">
        7 + 8
      </button>
    </div>
  </section>
);

export default MathCategories;
