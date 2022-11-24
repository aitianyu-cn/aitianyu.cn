/**@format */

export interface IBlockChart {
    row: number;
    col: number;
}

export interface IBlockRegionChart extends IBlockChart {
    i18n: string;
    rowSpan?: number;
    colSpan?: number;
    borderRadiusTopLeft?: boolean;
    borderRadiusTopRigth?: boolean;
    borderRadiusBottomLeft?: boolean;
    borderRadiusBottomRigth?: boolean;
    backgroundColor?: string;
}
