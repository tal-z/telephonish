import React, { useState } from 'react';
import styles from '../styles/HelpInstructions.module.css';

type HelpInstructionsProps = {
  title: string;
  message: string;
};

export const HelpInstructions = ({ title, message }: HelpInstructionsProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.accordionContainer}>
      <div className={expanded ? styles.accordionHeaderOpen : styles.accordionHeaderClosed} onClick={toggleExpanded}>
        <span className={`${styles.icon} ${expanded ? styles.iconOpen : ''}`}>{'+'}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={`${styles.content} ${expanded ? styles.contentOpen : ''}`}>
        <p className={styles.message}>{message}</p>
      </div>
    </div>
  );
};
