import React from "react";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.title}>Telephonish ☎️</span>
        </div>
        <nav className={styles.navbar}>
          <a href="/" className={styles.navlink}>
            Home
          </a>
          <a href="/instructions" className={styles.navlink}>
            How to Play
          </a>
          <a href="/game/new" className={styles.navlink}>
            Play
          </a>
        </nav>
      </div>
    </header>
  );
};
