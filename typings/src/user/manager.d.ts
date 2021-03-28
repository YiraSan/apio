import { User } from ".";
export declare class UserManager {
    private localUsers;
    /**
     * Add an user to the UserManager
     */
    add(user: User): this;
    /**
     * Remove an user from the UsertManager
     */
    remove(user: User): this;
    /**
     * Check if an user are in the UserManager
     */
    has(user: User): boolean;
    get users(): User[];
}
