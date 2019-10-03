export declare const Suits: {
    [s: string]: string;
};
export declare type Suit = keyof typeof Suits;
export declare class Card {
    suit: Suit;
    value: number;
    constructor(suit: Suit | string, value: number);
}
