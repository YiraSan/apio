import { Config, ConfigData } from ".";

interface ServerConfigData extends ConfigData {}

export class ServerConfig extends Config {

    constructor (obj?: ServerConfigData) {
        super(obj);
    }

}