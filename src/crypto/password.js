"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
var index_1 = require("./index");
var Password = /** @class */ (function () {
    function Password(password) {
        this.hash = index_1.hash(password);
    }
    Password.prototype.get = function () {
        return this.hash;
    };
    Password.compare = function (classic, sha) { return index_1.hash(classic) === sha; };
    return Password;
}());
exports.Password = Password;
