import { Request } from './index';
import { RequestData } from './data';
export declare class RequestManager {
    private internRequests;
    /**
     * Add a request to the RequestManager
     */
    add(req: Request): this;
    /**
     * Remove a request from the RequestManager
     */
    remove(req: Request): this;
    /**
     * Check if a request are in the RequestManager
     */
    has(req: Request): boolean;
    /**
     * Get all request by a key
     */
    get(key: string): Request[];
    /**
     * Execute all request by a key
     */
    exec(req_key: any, data: RequestData, ...args: any): this;
    get requests(): Request[];
}
