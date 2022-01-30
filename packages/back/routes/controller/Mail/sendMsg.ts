import { Server, Socket } from "socket.io";

import { Mail } from "@mail-app/model";
import { MailModel } from "@models/Mail";

import { 
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents,
    SocketData
} from '@mail-app/event';

export default (
        socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>,
        io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>
    ) => {
        return async (data : Mail) => {
            const c = await MailModel.findById(data.history == '' ? undefined : data.history);

            if (socket.data.user) {
                const doc = new MailModel<Mail>({
                    metadata: {
                        ...socket.data.user,
                        titre: data.metadata.titre,
                        categories: data.metadata.categories,
                        to: data.metadata.to
                    },
                    interaction: data.interaction,
                    content: data.content,
                    history: c?._id
                });

                await doc.save();

                const rooms = doc.metadata.to == doc.metadata.from ? [doc.metadata.to] : [doc.metadata.to, doc.metadata.from]

                io.to(rooms).emit("sendMsg", {
                    metadata: doc.metadata,
                    content : doc.content,
                    interaction: doc.interaction,
                    history: doc.history,
                    _id: doc._id
                });
            }
        }
}