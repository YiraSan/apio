"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermission = void 0;
var RolePermission = /** @class */ (function () {
    function RolePermission() {
        this.permission = {};
    }
    RolePermission.prototype.hasPermission = function (req_key) {
        return this.permission[req_key] ? true : false;
    };
    RolePermission.prototype.addPermission = function (req_key) {
        this.permission[req_key] = true;
        return this;
    };
    RolePermission.prototype.removePermission = function (req_key) {
        this.permission[req_key] = false;
        return this;
    };
    return RolePermission;
}());
exports.RolePermission = RolePermission;
