import React from "react";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.title}>Telephonish</span>
        </div>
        <nav className={styles.navbar}>
          <a href="/" className={styles.navlink}>
            Home
          </a>
          <a href="/how-to-play" className={styles.navlink}>
            How to Play
          </a>
          <a href="/gameplay" className={styles.navlink}>
            Play
          </a>
        </nav>
      </div>
    </header>
  );
};
