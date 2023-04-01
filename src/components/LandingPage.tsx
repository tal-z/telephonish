import React from "react";
import Head from "next/head";
import styles from "../styles/LandingPage.module.css";
import { JustifiedContainer } from "./JustifiedContainer";

export const LandingPage = () => {
  return (
    <JustifiedContainer alignment={"center"}>
      <Head>
        <title>Telephonish - Play Now!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Telephonish</h1>

        <p className={styles.description}>
          Telephonish is a modern twist on the classic game of Telephone, where
          players whisper a phrase or sentence from person to person and see how
          it changes by the end. With Telephonish, your whispers are replaced
          with new ways of getting the message across. You can play online with
          your friends, no matter where they are in the world!
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>How to Play &rarr;</h2>
            <p>
              Learn how to play Telephonish and get started on your first game!
            </p>
            <a href="/how-to-play" className={styles.cardBtn}>
              Learn More
            </a>
          </div>

          <div className={styles.card}>
            <h2>Start Playing &rarr;</h2>
            <p>Ready to jump in? Start playing Telephonish now!</p>
            <a href="/room" className={styles.cardBtn}>
              Start Playing
            </a>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Made with ❤️ by Tal Zaken</p>
      </footer>
    </JustifiedContainer>
  );
};
