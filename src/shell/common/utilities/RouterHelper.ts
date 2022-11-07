/**@format */

export function routerUrl2Id(url: string): string {
    let id = "";

    for (const ch of url) {
        const transChar = ch === "/" ? "_" : ch;
        id += transChar;
    }

    return id;
}
