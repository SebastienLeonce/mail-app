import { Server } from "socket.io";
import * as dotenv from 'dotenv'; dotenv.config();
import db from './plugins/db'; db;

import ClientToServerEvents from "./routes/type/ClientToServerEvents";
import InterServerEvents from "./routes/type/InterServerEvents";
import ServerToClientEvents from "./routes/type/ServerToClientEvents";
import SocketData from "./routes/type/SocketData";


import getUser from "./routes/controller/getUser";
import sendMsg from "./routes/controller/sendMsg";
import getMsg from "./routes/controller/getMsg";
import getAllUser from "./routes/controller/getAllUser";
import getMailById from "./routes/controller/getMailById";

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
    cors: {
        origin: "*",
    }
});

io.on("connection", (socket) => {
    socket.data.user = socket.handshake.auth as {
        name: string,
        account: string,
        from: string,
    };
    
    socket.join(socket.data.user.from)

    socket.on('getUser', getUser(socket))
    socket.on('sendMsg', sendMsg(socket, io))
    socket.on('getMsg', getMsg(socket))
    socket.on('getAllUser', getAllUser(socket))
    socket.on('getMailById', getMailById())
});

io.listen(parseInt(process.env.PORT || '3000'));

export default io;