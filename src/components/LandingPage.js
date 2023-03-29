import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {Header} from './Header';

export const LandingPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Telephonish - Play the Best Online Game Now</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Telephonish</span>!
        </h1>

        <p className={styles.description}>
          Telephonish is a fun and exciting online game that you can play with your friends.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>How to Play &rarr;</h2>
            <p>Learn how to play Telephonish and get started on your first game!</p>
              <a  href="/how-to-play" className={styles.cardBtn}>Learn More</a>
          </div>

          <div className={styles.card}>
            <h2>Start Playing &rarr;</h2>
            <p>Ready to jump in? Start playing Telephonish now!</p>
              <a href="/gameplay" className={styles.cardBtn}>Start Playing</a>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤️ by Tal Zaken</p>
      </footer>
    </div>
  );
};

