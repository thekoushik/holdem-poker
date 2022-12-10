import { Rank, Result } from "./Holdem";
export declare const TieBreaker: {
    [key: string]: (_ranks: Array<Rank>) => Result;
};
