import React, { FC, useState, useEffect } from "react";
import { Error } from "../../../components/pages/Error";

const ErrorPage = () => {
  const [errorTypeFromURL, setErrorTypeFromURL] = useState(() => "");
  useEffect(() => {
    const updateErrorTypeFromURL = () => {
      const pathname = window.location.pathname;
      const errorType = pathname.replace("/error/", "");
      setErrorTypeFromURL(errorType);
    };

    updateErrorTypeFromURL();
  }, []);

  let errorMessage = "An error occurred";
  switch (errorTypeFromURL) {
    case "room-already-exists":
      errorMessage = "The room you attempted to create already exists.";
      break;
    case "room-not-found":
      errorMessage = "We couldn't find the room you attempted to join.";
      break;
    case "unable-to-connect":
      errorMessage = "We couldn't connect you the room you attempted to join. Please check your password and try again.";
      break;
  }

  return (
    <div>
      <Error header={"Whoopsy daisy!"} message={errorMessage} />
    </div>
  );
};

export default ErrorPage;
