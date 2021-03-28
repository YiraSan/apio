"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestID = void 0;
var RequestID = /** @class */ (function () {
    function RequestID(sub) {
        this.id = sub + "--" + RequestID.generate();
        while (RequestID.exist[this.id])
            this.id = sub + "--" + RequestID.generate();
        RequestID.exist[this.id] = true;
    }
    RequestID.generate = function () { return "" + Math.random().toString(36).substring(7) + Math.random().toString(36).substring(7); };
    RequestID.exist = {};
    return RequestID;
}());
exports.RequestID = RequestID;
