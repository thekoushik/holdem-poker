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
  it('should be Hi Card', () => {
    expect(comp.name).toEqual("Hi Card");
  });
});
