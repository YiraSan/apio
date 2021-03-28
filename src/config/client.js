"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientConfig = void 0;
var _1 = require(".");
var ClientConfig = /** @class */ (function (_super) {
    __extends(ClientConfig, _super);
    function ClientConfig(obj) {
        var _this = _super.call(this, obj) || this;
        _this.address = "127.0.0.1";
        _this.info = { username: "root", password: "root" };
        if (obj) {
            if (obj["address"])
                _this.setAddress(obj["address"]);
            if (obj["login"])
                _this.setLogin(obj.login);
        }
        return _this;
    }
    ClientConfig.prototype.setAddress = function (address) {
        this.address = address;
        return this;
    };
    ClientConfig.prototype.setLogin = function (userinfo) {
        this.info = userinfo;
        return this;
    };
    return ClientConfig;
}(_1.Config));
exports.ClientConfig = ClientConfig;
