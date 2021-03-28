import * as crypto from "crypto-js";

export function hash(v: string) {
     return crypto.SHA256(v).toString(crypto.enc.Hex)
}