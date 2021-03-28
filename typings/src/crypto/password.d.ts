export declare class Password {
    static compare: (classic: string, sha: string) => boolean;
    private hash;
    constructor(password: string);
    get(): string;
}
