import { Mail } from "@mail-app/model";
import {
    model,
    Schema,
} from "mongoose";

const schema = new Schema < Mail > ({
    metadata: {
        name: {
            type: String,
            required: true
        },
        account: {
            type: String,
            required: true
        },
        from: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        titre: {
            type: String,
            required: true
        },
        categories: [{
            type: String,
            required: true
        }],
        to: {
            type: String,
            required: true
        }
    },
    interaction: {
        type: Boolean,
        required: true
    },
    content: {
        type: String
    },
    history: { type: Schema.Types.ObjectId, ref: 'Mail' }
});

export const MailModel =  model<Mail>('Mail', schema);