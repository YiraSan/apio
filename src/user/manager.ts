import { User } from ".";

export class UserManager {

    private localUsers: User[] = [];

    /**
     * Add an user to the UserManager
     */
    add (user: User) {
        if (this.has(user) === true) throw new Error("User already added");
        this.localUsers.push(user);
        return this;
    }

    /**
     * Remove an user from the UsertManager
     */
    remove (user: User) {
        this.localUsers = this.localUsers.filter(v=>v.id!=user.id)
        return this;
    }

    /**
     * Check if an user are in the UserManager
     */
    has (user: User) : boolean {
        let result = false;
        this.localUsers.forEach(v=>{if(v.id===user.id){result=true}})
        return result;
    }

    get users () : User[] {
        return this.localUsers.filter(v=>v);
    }

}