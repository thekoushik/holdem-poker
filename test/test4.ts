import { Game, Suits, Card, Result } from '../src';

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
      new Card(Suits.CLUB, 7),
      new Card(Suits.CLUB, 8),
      new Card(Suits.SPADE, 2),
      new Card(Suits.HEART, 7),
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
describe('Compare hand Royal flush', () => {
  let comp: Result;
  beforeAll(() => {
    const game = new Game([0, 0], 0);
    comp = game['__instance'].compareHands([
      [
        new Card(Suits.DIAMOND, 10),
        new Card(Suits.DIAMOND, 14),
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
      new Card(Suits.DIAMOND, 13),
      new Card(Suits.DIAMOND, 11),
      new Card(Suits.DIAMOND, 12),
    ]);
  });
  it('should win', () => {
    expect(comp.type).toEqual("win");
  });
  it('should be the 1st hand', () => {
    expect(comp.index).toEqual(0);
  });
  it('should be Royal flush', () => {
    expect(comp.name).toEqual("Royal flush");
  });
});
