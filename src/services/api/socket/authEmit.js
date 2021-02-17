import {configuredSocket} from "./configuredSoket";

export const authEmit = (id) => {
  configuredSocket.emit("SET_ID_SOCKET", {id});
}
