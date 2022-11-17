/**@format */

import { SHA256 } from "crypto-js";
import Base64 from "crypto-js/enc-base64";

export function hash(source: string): number {
    let length = source.length;
    let hashCode = 0;
    while (length--) {
        hashCode = (hashCode << 5) - hashCode + source.charCodeAt(length);
        hashCode = hashCode & hashCode; // convert to 32 bit
    }
    return hashCode;
}

export function sha256(source: string): string {
    return Base64.stringify(SHA256(source));
}
