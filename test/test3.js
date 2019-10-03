var Poker = require('../');
/*
Hi Card
Pair
Two pairs
Three of a kind
Straight
Flush
Full House
Four of a kind
Straight flush
Royal flush
*/
describe('Compare hand three of a kind (1)',()=>{
    var comp;
    beforeAll(()=>{
        var game = new Poker.Game();
        comp=game.compareHands([
            [
              new Poker.Card(Poker.Suits.DIAMOND,3),
              new Poker.Card(Poker.Suits.HEART,2),
            ],[
              new Poker.Card(Poker.Suits.CLUB,4),
              new Poker.Card(Poker.Suits.HEART,4),
            ],[
              new Poker.Card(Poker.Suits.DIAMOND,5),
              new Poker.Card(Poker.Suits.SPADE,7),
            ]
        ],[
          new Poker.Card(Poker.Suits.SPADE,3),
          new Poker.Card(Poker.Suits.HEART,7),
          new Poker.Card(Poker.Suits.CLUB,7),
        ]);
    });
    it('should win',()=>{
      expect(comp.type).toEqual("win");
    });
    it('should be the 3rd hand',()=>{
      expect(comp.index).toEqual(2);
    });
    it('should be three of a kind',()=>{
      expect(comp.name).toEqual("Three of a kind");
    });
  })