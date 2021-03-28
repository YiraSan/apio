import { Config, ConfigData } from ".";
interface userInfo {
    username: string;
    password: string;
}
interface ClientConfigData extends ConfigData {
    authentification?: boolean;
    port?: number;
    timeout?: number;
    address?: string;
    login?: userInfo;
}
export declare class ClientConfig extends Config {
    address: string;
    info: userInfo;
    constructor(obj?: ClientConfigData);
    setAddress(address: string): this;
    setLogin(userinfo: userInfo): this;
}
export {};
