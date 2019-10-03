import { Card } from "./Card";
export declare const DESC: (a: any, b: any) => number;
export interface HandValue {
    name: string;
    value: number;
}
interface TestCache {
    hicard: {
        suit: string;
        value: number;
    };
    pair: {
        value: number;
        index: number;
    };
    two_pairs: {
        all_indices: Array<number>;
        pair_indices: Array<number>;
    };
    three_of_a_kind: {
        value: number;
        indices: Array<number>;
    };
    four_of_a_kind: number;
    straight: any;
    flush: any;
    straight_flush: boolean;
}
export interface Rank {
    index: number;
    cache: TestCache;
    hand: Card[];
    name: string;
    value: number;
}
export declare class Holdem {
    private test_cache;
    private test_summary;
    private TestSeries;
    private TestHicard;
    private TestPair;
    private TestTwoPairs;
    private TestThreeOfAKind;
    private TestStraight;
    private TestFlush;
    private TestFullHouse;
    private TestFourOfAKind;
    private TestStraightFlush;
    private TestRoyalFlush;
    computeHand(hand: Array<Card>): HandValue;
    compareHands(hands: Array<Array<Card>>, community: Array<Card>): any;
}
export {};
