import { Game, Suits, Card, Result } from '../src';

describe('Straight Test:', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.HEART, 7),
        new Card(Suits.HEART, 2),
      ], [
        new Card(Suits.CLUB, 8),
        new Card(Suits.DIAMOND, 4),
      ]
    ], [
      new Card(Suits.DIAMOND, 6),
      new Card(Suits.HEART, 13),
      new Card(Suits.CLUB, 5),
      new Card(Suits.DIAMOND, 12),
      new Card(Suits.CLUB, 3),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be High Card', () => {
    expect(comp.name).toEqual("High Card");
  });
});
describe('Kicker Test:', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 4),
        new Card(Suits.CLUB, 10),
      ], [
        new Card(Suits.CLUB, 8),
        new Card(Suits.HEART, 10),
      ]
    ], [
      new Card(Suits.CLUB, 11),
      new Card(Suits.SPADE, 5),
      new Card(Suits.DIAMOND, 5),
      new Card(Suits.DIAMOND, 2),
      new Card(Suits.DIAMOND, 3),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be Pair of 5', () => {
    expect(comp.name).toEqual("Pair");
  });
  it('should be have 8 kicker', () => {
    expect(comp.tieBreak).toEqual(8);
  });
});
describe('Pair Test:', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.SPADE, 9),
        new Card(Suits.HEART, 6),
      ], [
        new Card(Suits.CLUB, 12),
        new Card(Suits.SPADE, 14),
      ]
    ], [
      new Card(Suits.HEART, 7),
      new Card(Suits.SPADE, 11),
      new Card(Suits.CLUB, 9),
      new Card(Suits.DIAMOND, 12),
      new Card(Suits.SPADE, 8),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 2nd hand', () => {
    expect(comp.index).toEqual(1);
  });
  it('should be Pair', () => {
    expect(comp.name).toEqual("Pair");
  });
});
