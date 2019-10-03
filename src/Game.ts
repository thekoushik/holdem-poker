import { Deck } from "./deck";
import { Card } from "./Card";
import { Holdem,HandValue } from "./Holdem";

export class Game{
    private deck:Deck;
    private __instance:Holdem;
    constructor(){
        this.deck=new Deck();
        this.deck.shuffle();
        this.__instance=new Holdem();
    }
    computeHand(hand:Array<Card>):HandValue{
        return this.__instance.computeHand(hand);
    }
    compareHands(hands:Array<Array<Card>>,community:Array<Card>){
        return this.__instance.compareHands(hands,community);
    }
}

