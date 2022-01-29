import { Mail } from "@mail-app/model"

export default interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    sendMsg: (data: Mail) => void;
    getMsg: (data : Mail[]) => void;
}
