/**@format */

import { getSearchParameterObj } from "src/dty/RouterHelper";

export function addSearch(searchName: string, searchValue: string): string {
    const searchParameter = getSearchParameterObj();

    searchParameter[searchName] = searchValue;

    const aNewSearchItems: string[] = [];
    for (const name of Object.keys(searchParameter)) {
        aNewSearchItems.push(`${name}=${searchParameter[name]}`);
    }

    return `?${aNewSearchItems.join("&")}`;
}
