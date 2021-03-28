import { Config, ConfigData } from ".";

interface userInfo {
    username: string,
    password: string,
}

interface ClientConfigData extends ConfigData {
    authentification?: boolean,
    port?: number,
    timeout?: number,
    address?: string,
    login?: userInfo,
}

export class ClientConfig extends Config {
    
    public address: string = "127.0.0.1";
    public info: userInfo = {username: "root", password: "root"};

    constructor (obj?: ClientConfigData) {
        super(obj)
        if (obj) {
            if (obj["address"]) this.setAddress(obj["address"]);
            if (obj["login"]) this.setLogin(obj.login);
        }
    }

    setAddress (address: string) {
        this.address = address;
        return this;
    }

    setLogin(userinfo: userInfo) {
        this.info = userinfo;
        return this;
    }

}