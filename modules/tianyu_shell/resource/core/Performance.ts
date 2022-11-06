/**@format */

import { TianyuShellLostException, TianyuShellPerformaceLost } from "./ExceptionBase";
import { ICaptureRecorder, PerfCaptureCallback } from "./Types";
import { validateTianyuShellPerformace } from "./Utilities";

export class PerfCapture {
    public static async clean(): Promise<void> {
        if (!validateTianyuShellPerformace()) {
            throw new TianyuShellLostException(TianyuShellPerformaceLost);
        }

        return tianyuShell.core.performance?.capture.clean();
    }

    public static addCallback(callback: PerfCaptureCallback): void {
        if (!validateTianyuShellPerformace()) {
            throw new TianyuShellLostException(TianyuShellPerformaceLost);
        }

        tianyuShell.core.performance?.capture.addCallback(callback);
    }

    public static start(classify: string, id: string): ICaptureRecorder {
        if (!validateTianyuShellPerformace()) {
            throw new TianyuShellLostException(TianyuShellPerformaceLost);
        }

        return tianyuShell.core.performance?.capture.start(classify, id);
    }

    public static end(recorder: ICaptureRecorder): void {
        if (!validateTianyuShellPerformace()) {
            throw new TianyuShellLostException(TianyuShellPerformaceLost);
        }

        return tianyuShell.core.performance?.capture.end(recorder);
    }

    public static saveToFile(fileName: string): void {
        if (!validateTianyuShellPerformace()) {
            throw new TianyuShellLostException(TianyuShellPerformaceLost);
        }

        return tianyuShell.core.performance?.capture.saveToFile(fileName);
    }
}
