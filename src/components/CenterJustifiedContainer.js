import React from 'react';
import styles from '../styles/Home.module.css';


export const CenterJustifiedContainer = ({ children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.centerJustifiedContainer}>
        {children}
      </div>
    </div>
  );
};

