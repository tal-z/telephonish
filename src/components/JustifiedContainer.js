import React from "react";
import styles from "../styles/JustifiedContainer.module.css";

export const JustifiedContainer = ({ alignment, children }) => {
  const textAlignment =
    alignment === "left"
      ? styles.leftJustifiedContainer
      : styles.centerJustifiedContainer;
  return (
    <div className={styles.container}>
      <div className={textAlignment}>{children}</div>
    </div>
  );
};
