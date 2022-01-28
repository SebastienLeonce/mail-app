export default interface InterServerEvents {
    ping: () => void;
    hi: (cb: any) => void;
}