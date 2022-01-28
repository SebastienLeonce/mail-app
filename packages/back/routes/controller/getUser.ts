import { Socket } from "socket.io";

import ClientToServerEvents from "../type/ClientToServerEvents";
import InterServerEvents from "../type/InterServerEvents";
import ServerToClientEvents from "../type/ServerToClientEvents";
import SocketData from "../type/SocketData";

export default (socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    return (cb : Function) => {
        cb(socket.data.user);
    };
}