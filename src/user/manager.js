"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserManager = void 0;
var UserManager = /** @class */ (function () {
    function UserManager() {
        this.localUsers = [];
    }
    /**
     * Add an user to the UserManager
     */
    UserManager.prototype.add = function (user) {
        if (this.has(user) === true)
            throw new Error("User already added");
        this.localUsers.push(user);
        return this;
    };
    /**
     * Remove an user from the UsertManager
     */
    UserManager.prototype.remove = function (user) {
        this.localUsers = this.localUsers.filter(function (v) { return v.id != user.id; });
        return this;
    };
    /**
     * Check if an user are in the UserManager
     */
    UserManager.prototype.has = function (user) {
        var result = false;
        this.localUsers.forEach(function (v) { if (v.id === user.id) {
            result = true;
        } });
        return result;
    };
    Object.defineProperty(UserManager.prototype, "users", {
        get: function () {
            return this.localUsers.filter(function (v) { return v; });
        },
        enumerable: false,
        configurable: true
    });
    return UserManager;
}());
exports.UserManager = UserManager;
