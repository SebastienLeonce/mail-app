import { Types } from "mongoose";

export interface Mail {
    _id?: Types.ObjectId | string,
    metadata: {
        sender: {
            name: string,
            lastName: string,
            account: string,
            mail: string,
        },
        receiver: string,
        subject: string,
        categories: string[]
        date?: Date
    };
    content: string;
    history: Types.ObjectId | string,
    extension?: {
        _id?: string,
        name: string,
        reference: object,
        version: string
    }
}

export const emptyMail : Mail = { 
    metadata: {
         sender: {
            name: '',
            lastName: '',
            account: '',
            mail: '',
        },
        receiver: '',
        subject: '',
        categories: []
    },
    content: '',
    history: '',
}