import { Card } from "./Card";
export declare class Deck {
    private cards;
    constructor();
    shuffle(): void;
    getCards(count?: number): Card[];
}
