"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestData = void 0;
var RequestData = /** @class */ (function () {
    function RequestData(user, data, socket) {
        this.socket = socket;
        this.user = user;
        this.call = {
            createdAt: new Date(data.createdAt) || new Date(),
            id: data.id,
            key: data.key,
        };
    }
    RequestData.prototype.response = function (v) {
        this.socket.emit("apio_request_response", this.call.key, this.call.id, { body: v, err: null });
    };
    RequestData.prototype.reject = function (reason) {
        this.socket.emit("apio_request_reject", this.call.key, this.call.id, { body: null, err: reason });
    };
    return RequestData;
}());
exports.RequestData = RequestData;
