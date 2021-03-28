import { hash } from "./index"

export class Password {

    static compare = (classic: string, sha: string) => hash(classic)===sha;

    private hash: string;

    constructor (password: string) {
        this.hash = hash(password)
    }

    get () {
        return this.hash;
    }

}