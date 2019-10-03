import {Game} from './Game';
import {Deck} from './Deck';
import {Card,Suits} from './Card';
import { HandValue } from './Holdem';

export {
    Game,
    HandValue,
    Deck,
    Card,
    Suits
}

declare global {
    interface Window {
        Game:Game,
        HandValue:HandValue,
        Deck:Deck,
        Card:Card,
        Suits:typeof Suits,
    }
}

