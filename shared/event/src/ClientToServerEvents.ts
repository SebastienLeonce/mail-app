import { Mail } from "@mail-app/model"

export default interface ClientToServerEvents {
    getUser: (cb : Function) => void;
    sendMsg: (data: Mail) => void;
    getMsg: (page?: number) => void;
    getAllUser : (cb : ( data : string[] ) => void) => void;
    getMailById : (id : Mail["_id"], cb : (arg0: Mail | null) => void) => void;
}
