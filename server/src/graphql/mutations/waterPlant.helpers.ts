import { GraphQLError } from "graphql";

import { websocketConnections } from "../../websockets";

export const triggerWatering = (hardwareId: string, plantIndex: number) => {
  const webSocket = websocketConnections.get(hardwareId);
  if (!webSocket) {
    throw new GraphQLError("Could not find device socket");
  }

  webSocket.send(`activate_pump:index=${plantIndex}`);
};
