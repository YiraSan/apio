"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
var Config = /** @class */ (function () {
    function Config(obj) {
        this.port = 3000;
        this.auth = true;
        this.timeout = 5000;
        if (obj) {
            if (obj["authentification"])
                this.setAuthentification(obj["authentification"]);
            if (obj["port"])
                this.setPort(obj["port"]);
            if (obj["timeout"])
                this.setTimeout(obj["timeout"]);
        }
    }
    Config.prototype.setAuthentification = function (auth) {
        this.auth = auth;
        return this;
    };
    Config.prototype.setPort = function (port) {
        if (("" + port).length !== 4)
            throw new Error("Invalid port format");
        this.port = port;
        return this;
    };
    Config.prototype.setTimeout = function (timeout) {
        this.timeout = timeout;
        return this;
    };
    /**
     * Return the port
     */
    Config.prototype.getPort = function () {
        return this.port;
    };
    /**
     * Return the authentification enabled
     */
    Config.prototype.getAuthentification = function () {
        return this.auth;
    };
    /**
     * Return the timeout of the instance (Client/Server)
     */
    Config.prototype.getTimeout = function () {
        return this.timeout;
    };
    Config.prototype.toJson = function () {
        return {
            port: this.port,
            authentification: this.auth,
            timeout: this.timeout,
        };
    };
    return Config;
}());
exports.Config = Config;
