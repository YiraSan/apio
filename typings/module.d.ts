import { Client } from "./src/instance/client";
import { Server } from "./src/instance/server";
import { Config, ConfigData } from "./src/config";
import { ClientConfig } from "./src/config/client";
import { ServerConfig } from "./src/config/server";
import { Request } from "./src/request";
import { RequestData, callData } from "./src/request/data";
import { RequestManager } from "./src/request/manager";
import { RequestID } from "./src/request/requestid";
import { User } from "./src/user";
import { UserManager } from "./src/user/manager";
import { Password } from "./src/crypto/password";
import { Authentification } from "./src/authentification";
import { RolePermission } from "./src/authentification/role";

declare module "apio-utils" {

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

    interface ServerConfigData extends ConfigData {}

    export class Client {
        private requestManager;
        private config;
        private socket;
        constructor(config: ClientConfig);
        call(key: string, ...args: any): Promise<any>;
    }

    export class Server {
        private requestManager;
        private userManager;
        private server;
        private io;
        constructor(config: ServerConfig, authContext?: Authentification);
        register(...req: Request[]): this;
        unregister(...req: Request[]): this;
        get users(): User[];
    }

    export class ClientConfig extends Config {
        address: string;
        info: userInfo;
        constructor(obj?: ClientConfigData);
        setAddress(address: string): this;
        setLogin(userinfo: userInfo): this;
    }

    export class ServerConfig extends Config {
        constructor(obj?: ServerConfigData);
    }

    export class Password {
        static compare: (classic: string, sha: string) => boolean;
        private hash;
        constructor(password: string);
        get(): string;
    }

    export class Request {
        private toDo;
        id: RequestID;
        key: string;
        constructor(key: string, callback: (data: RequestData, ...args: any) => {});
        get exec(): Function;
    }

    export class RequestID {
        private static generate;
        private static exist;
        id: string;
        constructor(sub: string);
    }

    export class RequestData {
        user: User;
        call: callData;
        constructor(user: User, data: callData, socket: any);
        response(v: any): void;
        reject(reason: string): void;
    }

    export class RequestManager {
        /**
         * Add a request to the RequestManager
         */
        add(req: Request): this;
        /**
         * Remove a request from the RequestManager
         */
        remove(req: Request): this;
        /**
         * Check if a request are in the RequestManager
         */
        has(req: Request): boolean;
        /**
         * Get all request by a key
         */
        get(key: string): Request[];
        /**
         * Execute all request by a key
         */
        exec(req_key: any, data: RequestData, ...args: any): this;
        get requests(): Request[];
    }

    interface userContent {
        password: Password;
        role: string;
    }

    interface userContentIntern {
        password: string;
        role: string;
    }

    interface userObject {
        [name: string]: userContent;
    }

    export class Authentification {
        static fromJson(): void;
        static toJson(): void;
        private role;
        private user;
        setRole(name: string, data: RolePermission): this;
        getRole(name: string): RolePermission;
        setUser(username: string, content: userContentIntern): this;
        getUser(username: string): userContent;
    }

    export class RolePermission {
        hasPermission(req_key: string): boolean;
        addPermission(req_key: string): this;
        removePermission(req_key: string): this;
    }
    
}

export { Client, Server, ClientConfig, ServerConfig, Request, RequestData, RequestManager, RequestID, User, UserManager, Password, Authentification, RolePermission };
