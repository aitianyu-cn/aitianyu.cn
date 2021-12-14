import { LanguageBase } from "../common/international/Language";
import { StorageBase } from "../common/tianyuCore/model/Storage";
import { IStorage } from "../common/tianyuCore/api/IStorage";

export const Storage: IStorage = new StorageBase();
export const Language: LanguageBase = new LanguageBase(Storage);