import { Socket } from "socket.io";

import { MailModel, Mail } from "@mail-app/model";

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
                    { 'metadata.from': socket.data.user?.from },
                    { 'metadata.to'  : socket.data.user?.from }
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