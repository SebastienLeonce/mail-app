import { Socket } from "socket.io";

import MailModel from '../modele/Mail'

import ClientToServerEvents from "../type/ClientToServerEvents";
import InterServerEvents from "../type/InterServerEvents";
import ServerToClientEvents from "../type/ServerToClientEvents";
import SocketData from "../type/SocketData";

export default (socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    return  async (cb : Function) => {
        const doc = await MailModel.
            find({ 'metadata.to': socket.data.user?.from })
            .distinct('metadata.from');

        cb(doc);
    };
}