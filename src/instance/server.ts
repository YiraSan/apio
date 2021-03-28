// IMPORT -->
import { UserManager } from '../user/manager';
import { Config } from '../config';
import { RequestManager } from '../request/manager';
import { Request } from '../request/';
import { User } from '../user';
import { callData, RequestData } from '../request/data';
import { Authentification } from '../authentification';
import { Password } from '../crypto/password';

export class Server {

    private requestManager: RequestManager = new RequestManager();
    private userManager: UserManager = new UserManager();
    
    private server = require('http').createServer();
    private io = require('socket.io')(this.server);

    constructor (config: Config, authContext?: Authentification) {

        if (!authContext && config.getAuthentification()) {
            throw new Error("Missing authentification context!");
        }

        this.io.on("connection", async (socket: any) => {
            
            let user_info = {
                address: socket.handshake.address.replace("::ffff:", ""),
                auth: socket.handshake.auth,
            }

            let user = new User({id:socket.id,handshake:user_info})
            let user_valid = false;
            this.userManager.add(user)

            socket.on('disconnecting', () => {
                this.userManager.remove(user)
            })

            // DISCONNECT TIMEOUT -->

            setTimeout(() => {
                if (!user_valid) socket.disconnect();
            }, config.getTimeout())

            // AUTH -->

            if (config.getAuthentification()) {

                if (!authContext) {
                    socket.emit("apio_error", "API Internal Server Error")
                    return socket.disconnect();
                } else if (user_info.auth.username == null || user_info.auth.password == null) {
                    socket.emit("apio_connetion_error", "This api use AuthentificationContext")
                    return socket.disconnect();
                } else if (!authContext.getUser(user_info.auth.username)) {
                    socket.emit("apio_connetion_error", "Invalid Password or Username")
                    return socket.disconnect();
                } else if (!Password.compare(user_info.auth.password, authContext.getUser(user_info.auth.username).password.get())) {
                    socket.emit("apio_connetion_error", "Invalid Password or Username")
                    return socket.disconnect();
                }
                
                user_valid = true;

            } else user_valid = true;

            socket.on('apio_request_call', (req_key : string, content : callData, ...args : any) => {

                // AUTH -->

                if (!user_valid) return;
                if (config.getAuthentification() && authContext) {
                    let role = authContext.getRole(authContext.getUser(user_info.auth.username).role);
                    if (!role.hasPermission(req_key) && !role.hasPermission("*")) return socket.emit("apio_error", `Unauthorized Access to '${req_key}'`);
                };

                // REQUEST CALL ->

                if (!req_key || !content) return;
                this.requestManager.exec(req_key, new RequestData(user, content, socket), ...args);

            })

        })

        this.server.listen(config.getPort());
    }

    register(...req : Request[]) {
        req.forEach(v => this.requestManager.add(v))
        return this;
    }

    unregister(...req : Request[]) {
        req.forEach(v=>this.requestManager.remove(v))
        return this;
    }
    

    get users () : User[] {
        return this.userManager.users;
    }

}