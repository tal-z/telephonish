import React from 'react';
import styles from "../styles/InviteLink.module.css";

type InviteLinkProps = {
  link: string;
};

export const InviteLink = ({ link }: InviteLinkProps) => {
  return (
    <div className={styles.inputContainer}>
      <input type="text" value={link} readOnly />
      <button onClick={() => navigator.clipboard.writeText(link)}>Copy Invite Link</button>
    </div>
  );
};
