import React from 'react';
import styles from '../styles/Home.module.css';


export const LeftJustifiedContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.leftJustifiedContainer}>
        {children}
      </div>
    </div>
  );
};

