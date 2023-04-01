import React from "react";
import styles from "../styles/JustifiedContainer.module.css";
import { Header } from "./Header";

type Alignment = 'left' | 'center';

interface ContainerProps {
  alignment: Alignment;
  children: React.ReactNode;
}

export const JustifiedContainer = ({ alignment, children }: ContainerProps) => {
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
