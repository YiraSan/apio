import { RequestData } from './data'; 
import { RequestID } from './requestid';

export class Request {

    private toDo: Function = () => {};

    public id: RequestID;
    public key: string;
    
    constructor (key: string, callback: (data: RequestData, ...args: any) => {}) {

        this.id = new RequestID("request");

        this.toDo = callback;
        this.key = key;

    }

    get exec () : Function {
        return this.toDo;
    }

}