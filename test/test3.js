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
});
describe('Compare hand Straight (1)',()=>{
  var comp;
  beforeAll(()=>{
      var game = new Poker.Game([0,0]);
      comp=game.__instance.compareHands([
          [
            new Poker.Card(Poker.Suits.DIAMOND,3),
            new Poker.Card(Poker.Suits.HEART,2),
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
        new Poker.Card(Poker.Suits.CLUB,6),
      ]);
  });
  it('should win',()=>{
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand',()=>{
    expect(comp.index).toEqual(1);
  });
  it('should be Straight',()=>{
    expect(comp.name).toEqual("Straight");
  });
});
describe('Compare hand hicard (3) ',()=>{
  var comp;
  beforeAll(()=>{
      var game = new Poker.Game([0,0]);
      comp=game.__instance.compareHands([
        [
          {suit: "SPADE", value: 4},
          {suit: "DIAMOND", value: 2}
        ],[
          {suit: "CLUB", value: 9},
          {suit: "SPADE", value: 11}
        ]
      ],[
        {suit: "SPADE", value: 5},
        {suit: "DIAMOND", value: 3},
        {suit: "SPADE", value: 13}
      ]);
  });
  it('should win',()=>{
    expect(comp.type).toEqual('win');
  })
  it('should be 2nd hand',()=>{
    expect(comp.index).toEqual(1);
  })
  it('should be hi card',()=>{
    expect(comp.name).toEqual('Hi Card');
  })
});