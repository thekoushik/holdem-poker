import { Card } from "./Card";
import { HandValue } from "./Holdem";
export declare class Game {
    private deck;
    private __instance;
    constructor();
    computeHand(hand: Array<Card>): HandValue;
    compareHands(hands: Array<Array<Card>>, community: Array<Card>): any;
}
