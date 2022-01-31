import 'pinia'

declare module 'pinia' {
    export interface PiniaCustomProperties {
        socket: Socket < ServerToClientEvents, ClientToServerEvents >
    }
};