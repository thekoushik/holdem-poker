import { Card, Suits } from "./Card";

export class Deck{
    private cards:Array<Card>;
    constructor(){
        const suits=[Suits.CLUB,Suits.DIAMOND,Suits.HEART,Suits.SPADE];
        this.cards=Array.apply(null,new Array(52)).map((_,v)=>new Card(suits[Math.floor(v/13)],(v%13)+2))
    }
    shuffle() {//http://en.wikipedia.org/wiki/Fisher-Yates_shuffle
		var currentIndex = this.cards.length, temporaryValue, randomIndex;
		while (0 !== currentIndex) {// While there remain elements to shuffle...
			randomIndex = Math.floor(Math.random() * currentIndex);// Pick a remaining element...
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[randomIndex];
			this.cards[randomIndex] = temporaryValue;
		}
    }
    getCards(count:number=1){
        return this.cards.splice(0,count);
    }
}