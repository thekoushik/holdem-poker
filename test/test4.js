var Poker = require('../');

describe('Compare hand three of a kind (1)',()=>{
    var comp;
    beforeAll(()=>{
        var game = new Poker.Game([0,0]);
        comp=game.__instance.compareHands([
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
          new Poker.Card(Poker.Suits.CLUB,7),
          new Poker.Card(Poker.Suits.CLUB,8),
          new Poker.Card(Poker.Suits.SPADE,2),
          new Poker.Card(Poker.Suits.HEART,7),
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
});
describe('Compare hand Royal flush',()=>{
    var comp;
    beforeAll(()=>{
        var game = new Poker.Game([0,0]);
        comp=game.__instance.compareHands([
            [
              new Poker.Card(Poker.Suits.DIAMOND,10),
              new Poker.Card(Poker.Suits.DIAMOND,14),
            ],[
              new Poker.Card(Poker.Suits.CLUB,4),
              new Poker.Card(Poker.Suits.HEART,5),
            ],[
              new Poker.Card(Poker.Suits.DIAMOND,5),
              new Poker.Card(Poker.Suits.SPADE,7),
            ]
        ],[
          new Poker.Card(Poker.Suits.SPADE,3),
          new Poker.Card(Poker.Suits.HEART,7),
          new Poker.Card(Poker.Suits.DIAMOND,13),
          new Poker.Card(Poker.Suits.DIAMOND,11),
          new Poker.Card(Poker.Suits.DIAMOND,12),
        ]);
    });
    it('should win',()=>{
      expect(comp.type).toEqual("win");
    });
    it('should be the 1st hand',()=>{
      expect(comp.index).toEqual(0);
    });
    it('should be Royal flush',()=>{
      expect(comp.name).toEqual("Royal flush");
    });
});
