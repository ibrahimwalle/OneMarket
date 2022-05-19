import { SearchResult } from "./search-result";
import { PaginationOutput } from "./pagination-output";

export interface FindItemsByKeywordsResponse {
    ack: string[]
    version: string[]
    timestamp: string[]
    searchResult: SearchResult[]
    paginationOutput: PaginationOutput[]
    itemSearchURL: string[]
}
