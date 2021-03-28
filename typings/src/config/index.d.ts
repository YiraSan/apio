export interface ConfigData {
    authentification?: boolean;
    port?: number;
    timeout?: number;
}
export declare abstract class Config {
    private port;
    private auth;
    private timeout;
    constructor(obj?: ConfigData);
    setAuthentification(auth: boolean): this;
    setPort(port: number): this;
    setTimeout(timeout: number): this;
    /**
     * Return the port
     */
    getPort(): number;
    /**
     * Return the authentification enabled
     */
    getAuthentification(): boolean;
    /**
     * Return the timeout of the instance (Client/Server)
     */
    getTimeout(): number;
    toJson(): ConfigData;
}
