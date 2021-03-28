import { Config } from '../config';
import { Request } from '../request/';
import { User } from '../user';
import { Authentification } from '../authentification';
export declare class Server {
    private requestManager;
    private userManager;
    private server;
    private io;
    constructor(config: Config, authContext?: Authentification);
    register(...req: Request[]): this;
    unregister(...req: Request[]): this;
    get users(): User[];
}
