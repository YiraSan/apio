export class RequestID {

    private static generate = () : string => `${Math.random().toString(36).substring(7)}${Math.random().toString(36).substring(7)}`;
    private static exist: { [key: string]: boolean; } = {};

    public id: string;

    constructor (sub:string) {
        this.id = `${sub}--${RequestID.generate()}`
        while(RequestID.exist[this.id]) this.id = `${sub}--${RequestID.generate()}`
        RequestID.exist[this.id] = true;
    }

}