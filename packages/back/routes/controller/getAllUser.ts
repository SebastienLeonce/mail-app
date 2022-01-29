import { Socket } from "socket.io";

import { MailModel } from "../models/Mail";

import { 
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents,
    SocketData
} from '@mail-app/event';

export default (socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    return  async (cb : Function) => {
        const doc = await MailModel.
            find({ 'metadata.to': socket.data.user?.from })
            .distinct('metadata.from');

        cb(doc);
    };
}