import { Card, Game, Suits } from '../src';

describe('Invalid test', () => {
    it('invalid suit should throw', () => {
        expect(() => new Card('invalid suit', 11)).toThrow();
    });
    it('invalid card value should throw', () => {
        expect(() => new Card('c', 1)).toThrow();
    })
    it('valid card value should not throw', () => {
        expect(() => new Card('c', 2)).not.toThrow();
    })
})
describe('Basic wins', () => {
    let game: Game;
    beforeAll(() => {
        game = new Game([0, 0], 0);
    });
    it('should be high card', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 2),
                new Card(Suits.HEART, 4),
                new Card(Suits.SPADE, 6),
                new Card(Suits.DIAMOND, 8),
                new Card(Suits.CLUB, 10),
            ]).name
        )
            .toEqual("High Card");
    });
    it('should be pair', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 2),
                new Card(Suits.HEART, 2),
                new Card(Suits.SPADE, 6),
                new Card(Suits.DIAMOND, 8),
                new Card(Suits.CLUB, 10),
            ]).name
        )
            .toEqual("Pair");
    });
    it('should not be pair', () => {
        expect(
            game.computeHand([
                new Card(Suits.SPADE, 2),
                new Card(Suits.HEART, 2),
                new Card(Suits.CLUB, 2),
                new Card(Suits.DIAMOND, 5),
                new Card(Suits.CLUB, 12),
            ]).name
        )
            .not.toEqual("Pair");
    });
    it('should be two pairs', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 2),
                new Card(Suits.HEART, 2),
                new Card(Suits.SPADE, 6),
                new Card(Suits.DIAMOND, 6),
                new Card(Suits.CLUB, 10),
            ]).name
        )
            .toEqual("Two pairs");
    });
    it('should be Three of a kind', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 2),
                new Card(Suits.DIAMOND, 6),
                new Card(Suits.HEART, 2),
                new Card(Suits.CLUB, 10),
                new Card(Suits.SPADE, 2),
            ]).name
        )
            .toEqual("Three of a kind");
    });
    it('should be Straight (1)', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 2),
                new Card(Suits.HEART, 3),
                new Card(Suits.SPADE, 4),
                new Card(Suits.DIAMOND, 5),
                new Card(Suits.CLUB, 6),
            ]).name
        )
            .toEqual("Straight");
    });
    it('should be Straight (2)', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 2),
                new Card(Suits.HEART, 3),
                new Card(Suits.SPADE, 4),
                new Card(Suits.DIAMOND, 14),
                new Card(Suits.CLUB, 5),
            ]).name
        )
            .toEqual("Straight");
    });
    it('should be Straight (3)', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 11),
                new Card(Suits.HEART, 12),
                new Card(Suits.SPADE, 13),
                new Card(Suits.DIAMOND, 14),
                new Card(Suits.CLUB, 10),
            ]).name
        )
            .toEqual("Straight");
    });
    it('should be flush', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 11),
                new Card(Suits.CLUB, 10),
                new Card(Suits.CLUB, 13),
                new Card(Suits.CLUB, 14),
                new Card(Suits.CLUB, 10),
            ]).name
        )
            .toEqual("Flush");
    });
    it('should be full house', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 11),
                new Card(Suits.HEART, 11),
                new Card(Suits.SPADE, 13),
                new Card(Suits.DIAMOND, 13),
                new Card(Suits.CLUB, 13),
            ]).name
        )
            .toEqual("Full House");
    });
    it('should be Four of a kind', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 11),
                new Card(Suits.HEART, 11),
                new Card(Suits.SPADE, 11),
                new Card(Suits.DIAMOND, 11),
                new Card(Suits.CLUB, 13),
            ]).name
        )
            .toEqual("Four of a kind");
    });
    it('should be Straight flush (1)', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 5),
                new Card(Suits.CLUB, 6),
                new Card(Suits.CLUB, 7),
                new Card(Suits.CLUB, 8),
                new Card(Suits.CLUB, 9),
            ]).name
        )
            .toEqual("Straight flush");
    });
    it('should be Straight flush (2)', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 3),
                new Card(Suits.CLUB, 2),
                new Card(Suits.CLUB, 14),
                new Card(Suits.CLUB, 5),
                new Card(Suits.CLUB, 4),
            ]).name
        )
            .toEqual("Straight flush");
    });
    it('should be Royal flush', () => {
        expect(
            game.computeHand([
                new Card(Suits.CLUB, 10),
                new Card(Suits.CLUB, 11),
                new Card(Suits.CLUB, 14),
                new Card(Suits.CLUB, 13),
                new Card(Suits.CLUB, 12),
            ]).name
        )
            .toEqual("Royal flush");
    });
    it('should be Three of a kind', () => {
        expect(
            game.computeHand([
                new Card(Suits.DIAMOND, 5),
                new Card(Suits.SPADE, 3),
                new Card(Suits.HEART, 7),
                new Card(Suits.CLUB, 7),
                new Card(Suits.SPADE, 7),
            ]).name
        ).toEqual("Three of a kind");
    });
})