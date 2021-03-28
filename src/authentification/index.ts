import { Password } from '../crypto/password';
import { RolePermission } from './role';

export interface userContent {
    password: Password,
    role: string,
}

export interface userContentIntern {
    password: string,
    role: string,
}

export interface userObject {
    [name: string]: userContent,
}

export class Authentification {

    static fromJson() : void {}
    static toJson() : void {}

    private role : { [name: string]: RolePermission } = {};
    private user : userObject = {};

    setRole (name : string, data: RolePermission) {
        this.role[name] = data;
        return this;
    }

    getRole (name : string) : RolePermission {
        return this.role[name]
    }

    setUser (username : string, content : userContentIntern) {
        this.user[username] = {
            password: new Password(content.password),
            role: content.role,
        }
        return this;
    }

    getUser (username : string) : userContent {
        return this.user[username]
    }

}