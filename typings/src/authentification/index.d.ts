import { Password } from '../crypto/password';
import { RolePermission } from './role';
export interface userContent {
    password: Password;
    role: string;
}
export interface userContentIntern {
    password: string;
    role: string;
}
export interface userObject {
    [name: string]: userContent;
}
export declare class Authentification {
    static fromJson(): void;
    static toJson(): void;
    private role;
    private user;
    setRole(name: string, data: RolePermission): this;
    getRole(name: string): RolePermission;
    setUser(username: string, content: userContentIntern): this;
    getUser(username: string): userContent;
}
