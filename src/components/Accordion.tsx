import React, { useState } from "react";
import styles from "../styles/Accordion.module.css";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

export const Accordion = ({ title, children }: AccordionProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.accordionContainer}>
      <div
        className={
          expanded ? styles.accordionHeaderOpen : styles.accordionHeaderClosed
        }
        onClick={toggleExpanded}
      >
        <span className={`${styles.icon} ${expanded ? styles.iconOpen : ""}`}>
          {"+"}
        </span>
        <span className={styles.title}>{title}</span>
      </div>
      <div
        className={`${styles.content} ${expanded ? styles.contentOpen : ""}`}
      >
        {children}
      </div>
    </div>
  );
};
