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
describe('Compare hands pair test 0',()=>{
    var comp;
    beforeAll(()=>{
        var game = new Poker.Game([0,0]);
        comp=game.__instance.compareHands([
            [
            new Poker.Card(Poker.Suits.CLUB,2),
            new Poker.Card(Poker.Suits.HEART,4)
            ],[
            new Poker.Card(Poker.Suits.DIAMOND,2),
            new Poker.Card(Poker.Suits.SPADE,2),
            ],
        ],[
          new Poker.Card(Poker.Suits.SPADE,6),
          new Poker.Card(Poker.Suits.DIAMOND,8),
          new Poker.Card(Poker.Suits.CLUB,10),
        ]);
    });
    it('has winner',()=>{
		expect(comp.type).toEqual("win");
    });
    it('should be the 2nd hand',()=>{
        expect(comp.index).toBe(1)
    });
    it('winner should have a pair',()=>{
        expect(comp.name).toEqual("Pair");
    })
});
describe('Compare hand hi card 1',()=>{
    var comp;
    beforeAll(()=>{
        var game = new Poker.Game([0,0]);
        comp=game.__instance.compareHands([
            [
            new Poker.Card(Poker.Suits.CLUB,2),
            new Poker.Card(Poker.Suits.HEART,4),
            ],[
            new Poker.Card(Poker.Suits.DIAMOND,2),
            new Poker.Card(Poker.Suits.SPADE,4),
            ],
        ],[
            new Poker.Card(Poker.Suits.HEART,6),
            new Poker.Card(Poker.Suits.CLUB,8),
            new Poker.Card(Poker.Suits.DIAMOND,10),
        ]);
    });
    it('is a draw',()=>{
		expect(comp.type).toEqual("draw");
    });
    it('should be hi card',()=>{
		expect(comp.name).toEqual("Hi Card");
    });
});
describe('Compare hand hi card 2',()=>{
    var comp;
    beforeAll(()=>{
        var game = new Poker.Game([0,0]);
        comp=game.__instance.compareHands([
            [
            new Poker.Card(Poker.Suits.CLUB,2),
            new Poker.Card(Poker.Suits.CLUB,10),
            ],[
            new Poker.Card(Poker.Suits.DIAMOND,2),
            new Poker.Card(Poker.Suits.DIAMOND,11),
            ],
        ],[
          new Poker.Card(Poker.Suits.SPADE,4),
          new Poker.Card(Poker.Suits.HEART,6),
          new Poker.Card(Poker.Suits.CLUB,8),
        ]);
    });
    it('is a win',()=>{
		expect(comp.type).toEqual("win");
    });
    it('should be the 2nd hand',()=>{
		expect(comp.index).toEqual(1);
    });
    it('should be hi card',()=>{
		expect(comp.name).toEqual("Hi Card");
    });
    it('should be diamond',()=>{
		expect(comp.suit).toEqual(Poker.Suits.DIAMOND);
    });
});
describe('Compare hand pair test 1',()=>{
  var comp;
  beforeAll(()=>{
      var game = new Poker.Game([0,0]);
      comp=game.__instance.compareHands([
          [
            new Poker.Card(Poker.Suits.DIAMOND,2),
            new Poker.Card(Poker.Suits.SPADE,2),
          ],[
            new Poker.Card(Poker.Suits.CLUB,4),
            new Poker.Card(Poker.Suits.HEART,4),
          ]
      ],[
        new Poker.Card(Poker.Suits.SPADE,6),
        new Poker.Card(Poker.Suits.DIAMOND,8),
        new Poker.Card(Poker.Suits.CLUB,10),
      ]);
  });
  it('should win',()=>{
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand',()=>{
    expect(comp.index).toEqual(1);
  });
  it('should be pair',()=>{
    expect(comp.name).toEqual("Pair");
  });
});
describe('Compare hand pair test2',()=>{
  var comp;
  beforeAll(()=>{
      var game = new Poker.Game([0,0]);
      comp=game.__instance.compareHands([
          [
            new Poker.Card(Poker.Suits.DIAMOND,4),
            new Poker.Card(Poker.Suits.SPADE,5),
          ],[
            new Poker.Card(Poker.Suits.DIAMOND,2),
            new Poker.Card(Poker.Suits.SPADE,2),
          ],[
            new Poker.Card(Poker.Suits.CLUB,4),
            new Poker.Card(Poker.Suits.HEART,4),
          ]
      ],[
        new Poker.Card(Poker.Suits.SPADE,6),
        new Poker.Card(Poker.Suits.DIAMOND,8),
        new Poker.Card(Poker.Suits.CLUB,10),
      ]);
  });
  it('should win',()=>{
    expect(comp.type).toEqual("win");
  });
  it('should be the 3rd hand',()=>{
    expect(comp.index).toEqual(2);
  });
  it('should be pair',()=>{
    expect(comp.name).toEqual("Pair");
  });
});
describe('Compare hand Two pair test',()=>{
  var comp;
  beforeAll(()=>{
      var game = new Poker.Game([0,0]);
      comp=game.__instance.compareHands([
          [
            new Poker.Card(Poker.Suits.DIAMOND,2),
            new Poker.Card(Poker.Suits.SPADE,2),
          ],[
            new Poker.Card(Poker.Suits.DIAMOND,5),
            new Poker.Card(Poker.Suits.SPADE,5),
          ],[
            new Poker.Card(Poker.Suits.CLUB,4),
            new Poker.Card(Poker.Suits.CLUB,2),
          ]
      ],[
        new Poker.Card(Poker.Suits.HEART,7),
        new Poker.Card(Poker.Suits.CLUB,7),
        new Poker.Card(Poker.Suits.SPADE,10),
      ]);
  });
  it('should win',()=>{
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand',()=>{
    expect(comp.index).toEqual(1);
  });
  it('should be two pairs',()=>{
    expect(comp.name).toEqual("Two pairs");
  });
})