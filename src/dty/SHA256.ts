/**@format */

const chrsz = 8;
const hexcase = 0;

export class SHA256 {
    private _Source: string;

    private constructor(source: string) {
        this._Source = source;
    }

    private safe_add(x: number, y: number): number {
        const lsw = (x & 0xffff) + (y & 0xffff);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);

        return (msw << 16) | (lsw & 0xffff);
    }

    private s(x: number, n: number): number {
        return this.r(x, n) | (x << (32 - n));
    }

    private r(x: number, n: number): number {
        return x >>> n;
    }

    private ch(x: number, y: number, z: number): number {
        return (x & y) ^ (~x & z);
    }

    private maj(x: number, y: number, z: number): number {
        return (x & y) ^ (x & z) ^ (y & z);
    }

    private sigma0256(x: number): number {
        return this.s(x, 2) ^ this.s(x, 13) ^ this.s(x, 22);
    }

    private sigma1256(x: number): number {
        return this.s(x, 6) ^ this.s(x, 11) ^ this.s(x, 25);
    }

    private gamma0256(x: number): number {
        return this.s(x, 7) ^ this.s(x, 18) ^ this.r(x, 3);
    }

    private gamma1256(x: number): number {
        return this.s(x, 17) ^ this.s(x, 19) ^ this.r(x, 10);
    }

    private strToBin(): number[] {
        const bin: number[] = [];

        const mask = (1 << chrsz) - 1;

        for (let i = 0; i < this._Source.length * chrsz; i += chrsz) {
            bin[i >> 5] |= (this._Source.charCodeAt(i / chrsz) & mask) << (24 - (i % 32));
        }

        return bin;
    }

    private binToHex(bin: number[]): string {
        const hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";

        let str = "";
        for (let i = 0; i < bin.length * 4; i++) {
            str +=
                hex_tab.charAt((bin[i >> 2] >> ((3 - (i % 4)) * 8 + 4)) & 0xf) +
                hex_tab.charAt((bin[i >> 2] >> ((3 - (i % 4)) * 8)) & 0xf);
        }

        return str;
    }

    private calculate(bin: number[], length: number): number[] {
        const key = [
            1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216,
            310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522,
            264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488,
            -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700,
            1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492,
            -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779,
            1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998,
        ];

        const HASH = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
        const W: number[] = new Array(64);

        let a, b, c, d, e, f, g, h;
        let i, j, T1, T2;

        bin[length >> 5] |= 0x80 << (24 - (length % 32));
        bin[(((length + 64) >> 9) << 4) + 15] = length;

        for (i = 0; i < bin.length; i += 16) {
            a = HASH[0];
            b = HASH[1];
            c = HASH[2];
            d = HASH[3];
            e = HASH[4];
            f = HASH[5];
            g = HASH[6];
            h = HASH[7];

            for (j = 0; j < 64; j++) {
                if (j < 16) W[j] = bin[j + i];
                else
                    W[j] = this.safe_add(
                        this.safe_add(this.safe_add(this.gamma1256(W[j - 2]), W[j - 7]), this.gamma0256(W[j - 15])),
                        W[j - 16],
                    );

                T1 = this.safe_add(
                    this.safe_add(this.safe_add(this.safe_add(h, this.sigma1256(e)), this.ch(e, f, g)), key[j]),
                    W[j],
                );
                T2 = this.safe_add(this.sigma0256(a), this.maj(a, b, c));
                h = g;
                g = f;
                f = e;
                e = this.safe_add(d, T1);
                d = c;
                c = b;
                b = a;
                a = this.safe_add(T1, T2);
            }

            HASH[0] = this.safe_add(a, HASH[0]);
            HASH[1] = this.safe_add(b, HASH[1]);
            HASH[2] = this.safe_add(c, HASH[2]);
            HASH[3] = this.safe_add(d, HASH[3]);
            HASH[4] = this.safe_add(e, HASH[4]);
            HASH[5] = this.safe_add(f, HASH[5]);
            HASH[6] = this.safe_add(g, HASH[6]);
            HASH[7] = this.safe_add(h, HASH[7]);
        }

        return HASH;
    }

    public getHash(): string {
        const bin = this.strToBin();
        const targetBin = this.calculate(bin, this._Source.length * chrsz);

        return this.binToHex(targetBin);
    }

    public static create(source: string): SHA256 {
        return new SHA256(source);
    }
}
