"use strict";
/*interface UserData {
    user: {
        id: string,
        handshake: {
            address: string,
            auth: {
                username: string,
                password: string,
            }
        }
    },
    call: {
        createdAt: Date,
        id: string,
        key: string,
    }
}*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(data) {
        this.id = data.id;
        this.data = data.handshake;
    }
    return User;
}());
exports.User = User;
