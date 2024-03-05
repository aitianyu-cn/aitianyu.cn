/**@format */

import { Exception } from "@aitianyu.cn/types";

export class TianyuShellMultipleInstanceException extends Exception {
    public constructor(msg: string) {
        super(msg);
    }

    public override toString(): string {
        return `正在尝试创建多个实例 - ( ${this.message} ) 类型只能创建一个实例`;
    }
}
