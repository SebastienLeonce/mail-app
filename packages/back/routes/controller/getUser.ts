import { Socket } from "socket.io";

import { 
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents,
    SocketData
} from '@mail-app/event';

export default (socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    return (cb : Function) => {
        cb(socket.data.user);
    };
}