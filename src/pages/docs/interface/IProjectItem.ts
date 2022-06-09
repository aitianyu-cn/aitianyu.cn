/**@format */

import { IParameters } from "src/dty/model/Interfaces";

export interface ProjectItem {
    name: string;
    i18n: string;
    path: string;

    options: IParameters;
}
