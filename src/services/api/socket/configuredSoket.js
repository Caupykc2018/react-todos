import {io} from "socket.io-client"

export const configuredSocket = io("http://localhost:3001");
