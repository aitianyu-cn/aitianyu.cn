/**@format */

export const TianyuShellCoreLost = "tianyushell_core";
export const TianyuShellFeatureToggleLost = "tianyushell_component_featureToggle";
export const TianyuShellLanguageLost = "tianyushell_core_language";
export const TianyuShellPerformaceLost = "tianyushell_core_performamce";

export class Exception extends Error {
    public constructor(message?: string, option?: unknown) {
        super(message, (option && { cause: option }) || undefined);
    }

    public toString(): string {
        return this.message;
    }
}

export class EmptyArgumentException extends Exception {
    public constructor(msg: string) {
        super(msg);
    }

    public override toString(): string {
        return `参数错误 - 指定的参数 ( ${this.message} ) 为空`;
    }
}

export class TianyuShellLostException extends Exception {
    public constructor(lostLib: string) {
        super(lostLib);
    }

    public override toString(): string {
        return `核心异常 - 天宇外壳无法找到库 ( ${this.message} )`;
    }
}

export class TianyuShellNotInitialException extends Exception {
    public constructor(msg: string) {
        super(msg);
    }

    public override toString(): string {
        return `未初始化的资源 - 天宇外壳无法找到入口 ( ${this.message} )`;
    }
}

export class TianyuShellMultipleInstanceException extends Exception {
    public constructor(msg: string) {
        super(msg);
    }

    public override toString(): string {
        return `正在尝试创建多个实例 - ( ${this.message} ) 类型只能创建一个实例`;
    }
}
