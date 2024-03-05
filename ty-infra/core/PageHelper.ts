/**@format */

export class PageHelper {
    public static refresh(): void {
        window.location.reload();
    }

    public static go(path: string = ""): void {
        window.location.href = `${window.location.origin}${!!path ? "/" : ""}${path || ""}`;
    }
}
