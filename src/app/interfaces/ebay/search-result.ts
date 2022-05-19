import { Item } from "./item";

export interface SearchResult {
    "@count": string;
    item: Item[];
}
