export interface ConfigData {
    authentification?: boolean,
    port?: number,
    timeout?: number,
}

export abstract class Config {

    private port: number = 3000;
    private auth: boolean = true;
    private timeout: number = 5000;

    constructor(obj?: ConfigData) {
        if (obj) {
            if (obj["authentification"]) this.setAuthentification(obj["authentification"]);
            if (obj["port"]) this.setPort(obj["port"]);
            if (obj["timeout"]) this.setTimeout(obj["timeout"]);
        }
    }

    setAuthentification (auth: boolean) {
        this.auth = auth;
        return this;
    }

    setPort (port: number) {
        if (`${port}`.length !== 4) throw new Error("Invalid port format");
        this.port = port;
        return this;
    }

    setTimeout (timeout: number) {
        this.timeout = timeout;
        return this;
    }

    /**
     * Return the port
     */
    getPort() {
        return this.port;
    }

    /**
     * Return the authentification enabled
     */
    getAuthentification () {
        return this.auth;
    }

    /**
     * Return the timeout of the instance (Client/Server)
     */
    getTimeout () {
        return this.timeout;
    }

    toJson () : ConfigData {
        return {
            port: this.port,
            authentification: this.auth,
            timeout: this.timeout,
        }
    }

}