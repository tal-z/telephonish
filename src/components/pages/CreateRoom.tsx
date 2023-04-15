import React from "react";
import { JustifiedContainer } from "../JustifiedContainer";
import { RoomSubmit } from "../RoomSubmit";

export const CreateRoom = () => {

  const createRoomEndpoint = "http://127.0.0.1:8000/game/create-room/"

  return (
    <JustifiedContainer alignment={"left"}>
      <RoomSubmit endpoint={createRoomEndpoint} />
    </JustifiedContainer>
  );
};
