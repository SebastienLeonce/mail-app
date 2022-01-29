import { Types } from "mongoose";

export interface Mail {
    _id?: Types.ObjectId | string,
    metadata: {
        name: string,
        account: string,
        from: string,
        date?: Date
        titre: string,
        categories: string[],
        to : string
    };
    interaction: boolean;
    content: string;
    history: Types.ObjectId | string
}

export const emptyMail : Mail = { 
    metadata: {
      name: '',
      account: '',
      from: '',
      titre: '',
      categories: [],
      to: ''
    },
    content: '',
    interaction: true,
    history: ''
}