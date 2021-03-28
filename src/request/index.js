"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
var requestid_1 = require("./requestid");
var Request = /** @class */ (function () {
    function Request(key, callback) {
        this.toDo = function () { };
        this.id = new requestid_1.RequestID("request");
        this.toDo = callback;
        this.key = key;
    }
    Object.defineProperty(Request.prototype, "exec", {
        get: function () {
            return this.toDo;
        },
        enumerable: false,
        configurable: true
    });
    return Request;
}());
exports.Request = Request;
