interface UserData {
    id: string;
    handshake: object;
}
export declare class User {
    id: string;
    data: object;
    constructor(data: UserData);
}
export {};
