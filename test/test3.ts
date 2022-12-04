import { Game, Suits, Card, Result } from '../src';
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
describe('Compare hand three of a kind (1)', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 3),
        new Card(Suits.HEART, 2),
      ], [
        new Card(Suits.CLUB, 4),
        new Card(Suits.HEART, 4),
      ], [
        new Card(Suits.DIAMOND, 5),
        new Card(Suits.SPADE, 7),
      ]
    ], [
      new Card(Suits.SPADE, 3),
      new Card(Suits.HEART, 7),
      new Card(Suits.CLUB, 7),
      new Card(Suits.CLUB, 10),
      new Card(Suits.CLUB, 12),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 3rd hand', () => {
    expect(comp.index).toEqual(2);
  });
  it('should be three of a kind', () => {
    expect(comp.name).toEqual("Three of a kind");
  });
});
describe('Compare hand Straight (1)', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 3),
        new Card(Suits.HEART, 2),
      ], [
        new Card(Suits.CLUB, 4),
        new Card(Suits.HEART, 5),
      ], [
        new Card(Suits.DIAMOND, 5),
        new Card(Suits.SPADE, 7),
      ]
    ], [
      new Card(Suits.SPADE, 3),
      new Card(Suits.HEART, 7),
      new Card(Suits.CLUB, 6),
      new Card(Suits.DIAMOND, 11),
      new Card(Suits.CLUB, 12),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be Straight', () => {
    expect(comp.name).toEqual("Straight");
  });
});
describe('Compare hand hicard (3) ', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        { suit: "SPADE", value: 4 },
        { suit: "DIAMOND", value: 2 }
      ], [
        { suit: "CLUB", value: 9 },
        { suit: "SPADE", value: 11 }
      ]
    ], [
      { suit: "SPADE", value: 5 },
      { suit: "DIAMOND", value: 3 },
      { suit: "SPADE", value: 13 },
      { suit: "HEART", value: 3 },
      { suit: "HEART", value: 10 },
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual('win');
  })
  it('should be 2nd hand', () => {
    expect(comp.index).toEqual(1);
  })
  it('should be hi card', () => {
    expect(comp.name).toEqual('Hi Card');
  })
});