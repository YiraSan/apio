import { User } from '../user/';

export interface callData {
    createdAt: Date,
    id: string,
    key: string,
}

export class RequestData {

    private socket: any;

    public user: User;
    public call: callData;

    constructor (user: User, data: callData, socket: any) {

        this.socket = socket;
        this.user = user;
        this.call = {
            createdAt: new Date(data.createdAt) || new Date(),
            id: data.id,
            key: data.key,
        };

    }

    response (v: any) {
        this.socket.emit("apio_request_response", this.call.key, this.call.id, {body: v, err: null})
    }

    reject (reason: string) {
        this.socket.emit("apio_request_reject", this.call.key, this.call.id, {body: null, err: reason})
    }

}