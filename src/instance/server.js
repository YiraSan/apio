"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// IMPORT -->
var manager_1 = require("../user/manager");
var manager_2 = require("../request/manager");
var user_1 = require("../user");
var data_1 = require("../request/data");
var password_1 = require("../crypto/password");
var Server = /** @class */ (function () {
    function Server(config, authContext) {
        var _this = this;
        this.requestManager = new manager_2.RequestManager();
        this.userManager = new manager_1.UserManager();
        this.server = require('http').createServer();
        this.io = require('socket.io')(this.server);
        if (!authContext && config.getAuthentification()) {
            throw new Error("Missing authentification context!");
        }
        this.io.on("connection", function (socket) { return __awaiter(_this, void 0, void 0, function () {
            var user_info, user, user_valid;
            var _this = this;
            return __generator(this, function (_a) {
                user_info = {
                    address: socket.handshake.address.replace("::ffff:", ""),
                    auth: socket.handshake.auth,
                };
                user = new user_1.User({ id: socket.id, handshake: user_info });
                user_valid = false;
                this.userManager.add(user);
                socket.on('disconnecting', function () {
                    _this.userManager.remove(user);
                });
                // DISCONNECT TIMEOUT -->
                setTimeout(function () {
                    if (!user_valid)
                        socket.disconnect();
                }, config.getTimeout());
                // AUTH -->
                if (config.getAuthentification()) {
                    if (!authContext) {
                        socket.emit("apio_error", "API Internal Server Error");
                        return [2 /*return*/, socket.disconnect()];
                    }
                    else if (user_info.auth.username == null || user_info.auth.password == null) {
                        socket.emit("apio_connetion_error", "This api use AuthentificationContext");
                        return [2 /*return*/, socket.disconnect()];
                    }
                    else if (!authContext.getUser(user_info.auth.username)) {
                        socket.emit("apio_connetion_error", "Invalid Password or Username");
                        return [2 /*return*/, socket.disconnect()];
                    }
                    else if (!password_1.Password.compare(user_info.auth.password, authContext.getUser(user_info.auth.username).password.get())) {
                        socket.emit("apio_connetion_error", "Invalid Password or Username");
                        return [2 /*return*/, socket.disconnect()];
                    }
                    user_valid = true;
                }
                else
                    user_valid = true;
                socket.on('apio_request_call', function (req_key, content) {
                    // AUTH -->
                    var _a;
                    var args = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        args[_i - 2] = arguments[_i];
                    }
                    if (!user_valid)
                        return;
                    if (config.getAuthentification() && authContext) {
                        var role = authContext.getRole(authContext.getUser(user_info.auth.username).role);
                        if (!role.hasPermission(req_key) && !role.hasPermission("*"))
                            return socket.emit("apio_error", "Unauthorized Access to '" + req_key + "'");
                    }
                    ;
                    // REQUEST CALL ->
                    if (!req_key || !content)
                        return;
                    (_a = _this.requestManager).exec.apply(_a, __spreadArray([req_key, new data_1.RequestData(user, content, socket)], args));
                });
                return [2 /*return*/];
            });
        }); });
        this.server.listen(config.getPort());
    }
    Server.prototype.register = function () {
        var _this = this;
        var req = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            req[_i] = arguments[_i];
        }
        req.forEach(function (v) { return _this.requestManager.add(v); });
        return this;
    };
    Server.prototype.remove = function () {
        var _this = this;
        var req = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            req[_i] = arguments[_i];
        }
        req.forEach(function (v) { return _this.requestManager.remove(v); });
        return this;
    };
    Object.defineProperty(Server.prototype, "users", {
        get: function () {
            return this.userManager.users;
        },
        enumerable: false,
        configurable: true
    });
    return Server;
}());
exports.Server = Server;
