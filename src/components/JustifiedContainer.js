import React from "react";
import styles from "../styles/JustifiedContainer.module.css";
import { Header } from "./Header";

export const JustifiedContainer = ({ alignment, children }) => {
  const textAlignment =
    alignment === "left"
      ? styles.leftJustifiedContainer
      : styles.centerJustifiedContainer;
  return (
    <div className={styles.container}>
      <Header />
      <div className={textAlignment}>{children}</div>
    </div>
  );
};
