import React from "react";
import { JustifiedContainer } from "../JustifiedContainer";

interface ErrorPageProps {
  header: string;
  message: string;
}

export const Error = ({ header, message }: ErrorPageProps) => {
  return (
    <JustifiedContainer alignment="center">
      <h1>{header}</h1>
      <p>{message}</p>
    </JustifiedContainer>
  );
};
