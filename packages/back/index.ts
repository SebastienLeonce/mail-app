import { Server } from "socket.io";
import * as dotenv from 'dotenv'; dotenv.config();
import db from './plugins/db'; db;

import { 
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents,
    SocketData
} from '@mail-app/event';

import {
    sendMsg,
    getMsg,
    getMailById
} from '@controller/Mail'

import {
    getUser,
    getAllUser
} from '@controller/User'

const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>({
    cors: {
        origin: ["*"]
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