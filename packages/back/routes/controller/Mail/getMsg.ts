import { Socket } from "socket.io";

import { MailModel } from "@models/Mail";

import { 
    ClientToServerEvents, 
    ServerToClientEvents, 
    InterServerEvents,
    SocketData
} from '@mail-app/event';

export default (socket : Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>) => {
    return async (page: number = 0) => {
        const doc = await MailModel.
            aggregate().
            match({
                $or: [
                    { 'metadata.sender.mail': socket.data.user?.from },
                    { 'metadata.receiver'  : socket.data.user?.from }
                ]
            }).
            lookup({
                from: 'mails',
                localField: '_id',
                foreignField: 'history',
                as: 'references'
            }).match({
                references: []
            }).sort({
                '_id': -1
            }).skip(page).limit(10).
            project({
                references: 0
            })
        
        socket.emit('getMsg', doc)
    };
}