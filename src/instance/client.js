"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var manager_1 = require("../request/manager");
var requestid_1 = require("../request/requestid");
var Client = /** @class */ (function () {
    function Client(config) {
        this.requestManager = new manager_1.RequestManager();
        this.config = config;
        if (config.getAuthentification()) {
            this.socket = (require("socket.io-client"))("http://" + config.address + ":" + config.getPort() + "/", { auth: { username: config.info.username, password: config.info.password }, transports: ['websocket', 'polling', 'flashsocket'] });
        }
        else {
            this.socket = (require("socket.io-client"))("http://" + config.address + ":" + config.getPort() + "/", { transports: ['websocket', 'polling', 'flashsocket'] });
        }
        this.socket.on("apio_connetion_error", function (err) {
            throw new Error("Connection: " + err);
        });
        this.socket.on("apio_error", function (err) {
            throw new Error(err);
        });
    }
    Client.prototype.call = function (key) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var _a;
            setTimeout(function () {
                reject("Reseponse timeout");
            }, _this.config.getTimeout());
            var content = { createdAt: new Date(), id: new requestid_1.RequestID("call").id, key: key };
            (_a = _this.socket).emit.apply(_a, __spreadArray(["apio_request_call", key, content], args));
            _this.socket.on("apio_request_response", function (req_key, id, response) {
                if (req_key != key || id != content.id)
                    return;
                resolve(response);
            });
            _this.socket.on("apio_request_reject", function (req_key, id, reason) {
                if (req_key != key || id != content.id)
                    return;
                if (reason == null)
                    reason = "No reason from the api";
                reject(reason);
            });
        });
    };
    return Client;
}());
exports.Client = Client;
