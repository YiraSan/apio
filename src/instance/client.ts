import { RequestManager } from "../request/manager";
import { ClientConfig } from "../config/client";
import { RequestID } from "../request/requestid";

interface callContent {
    id: string,
    createdAt: Date,
    key: string,
}

export class Client {

    private requestManager: RequestManager = new RequestManager();
    private config: ClientConfig;
    private socket: any;

    constructor (config: ClientConfig) {

        this.config = config;

        if (config.getAuthentification()) {
            this.socket = (require("socket.io-client"))(`http://${config.address}:${config.getPort()}/`, {auth: {username: config.info.username, password: config.info.password}, transports: ['websocket', 'polling', 'flashsocket']})
        } else {
            this.socket = (require("socket.io-client"))(`http://${config.address}:${config.getPort()}/`, {transports: ['websocket', 'polling', 'flashsocket']})
        }

        this.socket.on("apio_connetion_error", (err: string) => {
            throw new Error(`Connection: ${err}`);
        })

        this.socket.on("apio_error", (err: string) => {
            throw new Error(err);
        })

    }
 
    call (key: string, ...args: any) : Promise<any> {
        
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                reject("Response timeout")
            }, this.config.getTimeout())

            let content: callContent = {createdAt: new Date(), id: new RequestID("call").id, key:key};

            this.socket.emit("apio_request_call", key, content, ...args);

            this.socket.on("apio_request_response", (req_key: string, id: string, response: any) => {

                if (req_key != key || id != content.id) return;
                resolve(response);

            })

            this.socket.on("apio_request_reject", (req_key: string, id: string, reason: string) => {

                if (req_key != key || id != content.id) return;
                if (reason == null) reason = "No reason from the api";
                reject(reason);

            })

        })

    }

}