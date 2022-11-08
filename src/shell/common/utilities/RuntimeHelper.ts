/**@format */

declare const navigator: any;

export function isIOS() {
    const sUserAgent = navigator.userAgent.toLowerCase();

    const bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    const bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";

    return bIsIpad || bIsIphoneOs;
}
