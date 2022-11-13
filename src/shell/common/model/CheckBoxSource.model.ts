/**@format */

import { MapOfType } from "ts-core/Types";

export interface ICheckBoxSource {
    description: string;
    children: MapOfType<ICheckBoxSource>;
}
