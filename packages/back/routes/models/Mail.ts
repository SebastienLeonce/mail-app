import { Mail } from "@mail-app/model";
import {
    model,
    Schema,
} from "mongoose";

const schema = new Schema < Mail > ({
    metadata: {
        sender: {
            name: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            account: {
                type: String,
                required: true
            },
            mail: {
                type: String,
                required: true
            }
        },
        receiver: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        categories: [{
            type: String,
            required: true
        }],
        date: {
            type: Date,
            default: Date.now
        }
    },
    content: {
        type: String,
        required: true
    },
    history: { type: Schema.Types.ObjectId, ref: 'Mail' }
});

export const MailModel =  model<Mail>('Mail', schema);