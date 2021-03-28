import { ClientConfig } from "../config/client";
export declare class Client {
    private requestManager;
    private config;
    private socket;
    constructor(config: ClientConfig);
    call(key: string, ...args: any): Promise<any>;
}
