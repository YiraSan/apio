import { User } from '../user/';
export interface callData {
    createdAt: Date;
    id: string;
    key: string;
}
export declare class RequestData {
    private socket;
    user: User;
    call: callData;
    constructor(user: User, data: callData, socket: any);
    response(v: any): void;
    reject(reason: string): void;
}
