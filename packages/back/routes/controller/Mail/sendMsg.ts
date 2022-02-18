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
                        sender: {
                            name: socket.data.user.name,
                            lastName: socket.data.user.name,
                            account: socket.data.user.account,
                            mail: socket.data.user.from
                        },
                        receiver: data.metadata.receiver,
                        subject: data.metadata.subject,
                        categories: data.metadata.categories
                    },
                    content: data.content,
                    history: c?._id
                });

                await doc.save();

                const rooms = doc.metadata.receiver == doc.metadata.sender.mail ? [doc.metadata.receiver] : [doc.metadata.receiver, doc.metadata.sender.mail]

                io.to(rooms).emit("sendMsg", {
                    metadata: doc.metadata,
                    content : doc.content,
                    history: doc.history,
                    _id: doc._id
                });
            }
        }
}