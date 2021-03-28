export interface Permission {
    [name: string]: boolean,
}

export class RolePermission {

    private permission: Permission = {};

    hasPermission(req_key: string) : boolean {
        return this.permission[req_key] ? true : false;
    }

    addPermission(req_key: string) {
        this.permission[req_key] = true;
        return this;
    }

    removePermission(req_key: string) {
        this.permission[req_key] = false;
        return this;
    }

}