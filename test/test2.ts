import { Card, Game, Result, Suits } from '../src';
/*
High Card
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
describe('Compare hands pair test 0', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.CLUB, 2),
        new Card(Suits.HEART, 4)
      ], [
        new Card(Suits.DIAMOND, 2),
        new Card(Suits.SPADE, 2),
      ],
    ], [
      new Card(Suits.SPADE, 6),
      new Card(Suits.DIAMOND, 8),
      new Card(Suits.CLUB, 10),
    ]);
  });
  it('has winner', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toBe(1)
  });
  it('winner should have a pair', () => {
    expect(comp.name).toEqual("Pair");
  })
});
describe('Compare hand high card 1', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.CLUB, 2),
        new Card(Suits.HEART, 4),
      ], [
        new Card(Suits.DIAMOND, 2),
        new Card(Suits.SPADE, 4),
      ],
    ], [
      new Card(Suits.HEART, 6),
      new Card(Suits.CLUB, 8),
      new Card(Suits.DIAMOND, 10),
    ]);
  });
  it('is a draw', () => {
    expect(comp.type).toEqual("draw");
  });
  it('should be high card', () => {
    expect(comp.name).toEqual("High Card");
  });
});
describe('Compare hand high card 2', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.CLUB, 2),
        new Card(Suits.CLUB, 10),
      ], [
        new Card(Suits.DIAMOND, 2),
        new Card(Suits.DIAMOND, 11),
      ],
    ], [
      new Card(Suits.SPADE, 4),
      new Card(Suits.HEART, 6),
      new Card(Suits.CLUB, 8),
    ]);
  });
  it('is a win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be high card', () => {
    expect(comp.name).toEqual("High Card");
  });
  it('should be diamond', () => {
    expect(comp.suit).toEqual(Suits.DIAMOND);
  });
});
describe('Compare hand pair test 1', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 2),
        new Card(Suits.SPADE, 2),
      ], [
        new Card(Suits.CLUB, 4),
        new Card(Suits.HEART, 4),
      ]
    ], [
      new Card(Suits.SPADE, 6),
      new Card(Suits.DIAMOND, 8),
      new Card(Suits.CLUB, 10),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be pair', () => {
    expect(comp.name).toEqual("Pair");
  });
});
describe('Compare hand pair test2', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 4),
        new Card(Suits.SPADE, 5),
      ], [
        new Card(Suits.DIAMOND, 2),
        new Card(Suits.SPADE, 2),
      ], [
        new Card(Suits.CLUB, 4),
        new Card(Suits.HEART, 4),
      ]
    ], [
      new Card(Suits.SPADE, 6),
      new Card(Suits.DIAMOND, 8),
      new Card(Suits.CLUB, 10),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 3rd hand', () => {
    expect(comp.index).toEqual(2);
  });
  it('should be pair', () => {
    expect(comp.name).toEqual("Pair");
  });
});
describe('Compare hand Two pair test', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 2),
        new Card(Suits.SPADE, 2),
      ], [
        new Card(Suits.DIAMOND, 5),
        new Card(Suits.SPADE, 5),
      ], [
        new Card(Suits.CLUB, 4),
        new Card(Suits.CLUB, 2),
      ]
    ], [
      new Card(Suits.HEART, 7),
      new Card(Suits.CLUB, 7),
      new Card(Suits.SPADE, 10),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be two pairs', () => {
    expect(comp.name).toEqual("Two pairs");
  });
})