import React, { useState } from "react";
import styles from "../styles/Accordion.module.css";

type AccordionProps = {
  title: string;
  message: string | null;
  children: React.ReactNode;
};

export const Accordion = ({ title, message, children }: AccordionProps) => {
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
        <p className={styles.message}>{message}</p>
        {children}
      </div>
    </div>
  );
};
