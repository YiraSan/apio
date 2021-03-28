"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentification = void 0;
var password_1 = require("../crypto/password");
var Authentification = /** @class */ (function () {
    function Authentification() {
        this.role = {};
        this.user = {};
    }
    Authentification.fromJson = function () { };
    Authentification.toJson = function () { };
    Authentification.prototype.setRole = function (name, data) {
        this.role[name] = data;
        return this;
    };
    Authentification.prototype.getRole = function (name) {
        return this.role[name];
    };
    Authentification.prototype.setUser = function (username, content) {
        this.user[username] = {
            password: new password_1.Password(content.password),
            role: content.role,
        };
        return this;
    };
    Authentification.prototype.getUser = function (username) {
        return this.user[username];
    };
    return Authentification;
}());
exports.Authentification = Authentification;
