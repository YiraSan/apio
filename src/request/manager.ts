import { Request } from './index';
import { RequestData } from './data';

export class RequestManager {

    private internRequests: Request[] = [];

    // MANAGER -->

    /**
     * Add a request to the RequestManager
     */
    add (req: Request) {
        if (this.has(req) === true) throw new Error("Request already added");
        this.internRequests.push(req);
        return this;
    }

    /**
     * Remove a request from the RequestManager
     */
    remove (req: Request) {
        this.internRequests = this.internRequests.filter(v=>v.id!=req.id)
        return this;
    }

    /**
     * Check if a request are in the RequestManager
     */
    has (req: Request) : boolean {
        let result = false;
        this.internRequests.forEach(v=>{if(v.id===req.id){result=true}})
        return result;
    }

    /**
     * Get all request by a key
     */
    get (key:string) : Request[] {
        return this.internRequests.filter(v=>v.key==key);
    }

    // UTILS -->

    /**
     * Execute all request by a key
     */
    exec (req_key: any, data: RequestData, ...args: any) {
        this.get(req_key).forEach(async v => v.exec(data, ...args))
        return this;
    }

    get requests () : Request[] {
        let result: Request[] = [];
        let keys = Object.keys(this.requests)
        keys.forEach(v=>result=result.concat(this.get(v)))
        return result.filter(v=>v);
    }

}