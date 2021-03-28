export interface Permission {
    [name: string]: boolean;
}
export declare class RolePermission {
    private permission;
    hasPermission(req_key: string): boolean;
    addPermission(req_key: string): this;
    removePermission(req_key: string): this;
}
