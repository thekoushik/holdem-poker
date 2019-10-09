import {Game,Player,Round} from './Game';
import {Deck} from './Deck';
import {Card,Suits} from './Card';
import { HandValue, Result } from './Holdem';

export {
    Game,
    HandValue,
    Result,
    Deck,
    Card,
    Suits,
    Player,
    Round
}

declare global {
    interface Window {
        Game:Game,
        HandValue:HandValue,
        Deck:Deck,
        Card:Card,
        Suits:typeof Suits,
        Result:Result,
        Player:Player,
        Round:Round,
    }
}

