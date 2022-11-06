/**@format */

export enum EncryptOption {
    Encryption,
    Decryption,
}

export interface ICipher {
    encryption(source: number[]): number[];
    decryption(source: number[]): number[];
}
