import { RequestData } from './data';
import { RequestID } from './requestid';
export declare class Request {
    private toDo;
    id: RequestID;
    key: string;
    constructor(key: string, callback: (data: RequestData, ...args: any) => {});
    get exec(): Function;
}
