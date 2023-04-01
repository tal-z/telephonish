import React from "react";
import { JustifiedContainer } from "../JustifiedContainer";
import { RoomSubmit } from "../RoomSubmit";

export const CreateRoom = () => {
  return (
    <JustifiedContainer alignment={"left"}>
      <RoomSubmit endpoint="https://httpbin.org/post" />
    </JustifiedContainer>
  );
};
