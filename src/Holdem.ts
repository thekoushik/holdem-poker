import { Card } from "./Card";
import { TieBreaker } from "./TieBreaker";

export const DESC = (a: any, b: any): number => b.value - a.value;
const ASC = (a: Card, b: Card): number => a.value - b.value;
const VASC = (a: number, b: number): number => a - b;

const HAND_HICARD = "Hi Card";
const HAND_PAIR = "Pair";
const HAND_TWOPAIRS = "Two pairs";
const HAND_THREEOFAKIND = "Three of a kind";
const HAND_STRAIGHT = "Straight";
const HAND_FLUSH = "Flush";
const HAND_FULLHOUSE = "Full House";
const HAND_FOUROFAKIND = "Four of a kind";
const HAND_STRAIGHTFLUSH = "Straight flush";
const HAND_ROYALFLUSH = "Royal flush";

export interface HandValue {
    name: string;
    value: number;
}
/**
 * Result of compareHands
 * 
 * @property type   win or draw
 * @property index  winner index(if win)
 * @property name   winning hand
 * @property suit   suit name if won with hicard
 * @property value  card value if won with hicard
 */
export interface Result {
    type: 'win' | 'draw';
    index?: number;
    name?: string;
    suit?: string;
    value?: number;
    tieBreakHiCard?: boolean;
}
interface TestCache {
    hicard: {
        suit: string,
        value: number
    },
    pair: {
        value: number,
        index: number
    };
    two_pairs: {
        all_indices: Array<number>,
        pair_indices: Array<number>
    };
    three_of_a_kind: {
        value: number,
        indices: Array<number>
    };
    four_of_a_kind: number,
    straight: { start?: number; result: boolean; };
    flush: any;
    straight_flush: boolean;
}
export interface Rank {
    index: number;
    cache: TestCache;
    hand: Card[];
    name: string;
    value: number;
}

export class Holdem {
    private test_cache: TestCache = {
        hicard: {
            suit: '',
            value: 0
        },
        pair: {
            value: 0,
            index: -1
        },
        two_pairs: {
            all_indices: [],
            pair_indices: []
        },
        three_of_a_kind: {
            value: 0,
            indices: []
        },
        four_of_a_kind: 0,
        straight: { result: false },
        flush: { result: false },
        straight_flush: false,
    };
    private test_summary: {
        value: {
            [key: number]: Array<number>
        },
        suit: {
            [key: string]: Array<number>
        }
    } = {
            value: {},
            suit: {}
        };
    private TestSeries: { name: string, fn: Function }[] = [
        { name: HAND_HICARD, fn: this.TestHicard },
        { name: HAND_PAIR, fn: this.TestPair },
        { name: HAND_TWOPAIRS, fn: this.TestTwoPairs },
        { name: HAND_THREEOFAKIND, fn: this.TestThreeOfAKind },
        { name: HAND_STRAIGHT, fn: this.TestStraight },
        { name: HAND_FLUSH, fn: this.TestFlush },
        { name: HAND_FULLHOUSE, fn: this.TestFullHouse },
        { name: HAND_FOUROFAKIND, fn: this.TestFourOfAKind },
        { name: HAND_STRAIGHTFLUSH, fn: this.TestStraightFlush },
        { name: HAND_ROYALFLUSH, fn: this.TestRoyalFlush }
    ];
    //Simple value of the card. Lowest: 2 - Highest: Ace(14)
    private TestHicard(hand: Array<Card>, mainCards: Array<Card>) {
        let card = mainCards.slice(0).sort(DESC)[0];
        this.test_cache.hicard = { suit: card.suit + '', value: card.value };
        return card.value;
    }
    //Two cards with the same value
    private TestPair(hand: Array<Card>, mainCards: Array<Card>) {
        for (let key in this.test_summary.value)
            if (this.test_summary.value[key].length == 2) {
                this.test_cache.pair = { value: Number(key), index: this.test_summary.value[key][0] };
                return true;
            }
        return false;
    }
    //Two times two cards with the same value
    private TestTwoPairs(hand: Array<Card>, mainCards: Array<Card>) {
        let all_indices: number[] = [];
        let pair_indices: number[] = [];
        for (let key in this.test_summary.value) {
            if (this.test_summary.value[key].length == 2) {
                let [a, b] = this.test_summary.value[key];
                pair_indices.push(a);
                all_indices.push(a);
                all_indices.push(b);
            }
        }
        if (pair_indices.length == 2) {
            this.test_cache.two_pairs = { all_indices, pair_indices };
            return true;
        }
    }
    //Three cards with the same value
    private TestThreeOfAKind(hand: Array<Card>, mainCards: Array<Card>) {
        for (let key in this.test_summary.value) {
            if (this.test_summary.value[key].length == 3) {
                this.test_cache.three_of_a_kind.value = Number(key);
                this.test_cache.three_of_a_kind.indices = this.test_summary.value[key];
                return true;
            }
        }
    }
    //Sequence of 5 cards in increasing value (Ace can precede 2 and follow up King)
    private TestStraight(hand: Array<Card>, mainCards: Array<Card>) {
        let seq_count = 0;
        let seq_start = -1;
        let max_seq_count = 0;
        let max_seq_start = -1;
        const seq = hand.slice(0).sort(ASC);
        for (let i = 0; i < seq.length - 1; i++) {
            if (seq[i].value === seq[i + 1].value - 1) {
                if (seq_start < 0) seq_start = i;
                seq_count++;
            } else if (seq_count < 4) {
                // save max progress
                if (max_seq_count < seq_count) {
                    max_seq_count = seq_count;
                    max_seq_start = seq_start;
                }
                seq_count = 0;
                seq_start = -1;
            }
        }
        // restore max progress
        if (max_seq_count > seq_count) {
            seq_count = max_seq_count;
            seq_start = max_seq_start;
        }
        // sequence count is always one less because we check next card
        const result: boolean = seq_count >= 4 || (seq_count == 3 && seq_start == 0 && seq[seq.length - 1].value == 14);
        this.test_cache.straight.result = result;
        if (result) {
            this.test_cache.straight.start = hand.findIndex((f: Card) => f.suit == seq[seq_start].suit && f.value == seq[seq_start].value);
        }
        return result;
    }
    //5 cards of the same suit
    private TestFlush(hand: Array<Card>, mainCards: Array<Card>) {
        for (let key in this.test_summary.suit) {
            if (this.test_summary.suit[key].length == 5) {
                this.test_cache.flush = { suit: key, result: true };
                return true;
            }
        }
        this.test_cache.flush = {
            result: false
        };
    }
    //Combination of three of a kind and a pair
    private TestFullHouse(hand: Array<Card>, mainCards: Array<Card>) {
        if (this.test_cache.three_of_a_kind.indices.length == 3 && this.test_cache.pair.value >= 2) {
            return this.test_cache.three_of_a_kind.value !== this.test_cache.pair.value;
        }
    }
    //Four cards of the same value
    private TestFourOfAKind(hand: Array<Card>, mainCards: Array<Card>) {
        for (let key in this.test_summary.value) {
            if (this.test_summary.value[key].length == 4) {
                this.test_cache.four_of_a_kind = Number(key);
                return true;
            }
        }
    }
    //Straight of the same suit
    private TestStraightFlush(hand: Array<Card>, mainCards: Array<Card>) {
        if (this.test_cache.straight.result && this.test_cache.straight.start !== undefined && this.test_cache.flush.result) {
            if (hand[this.test_cache.straight.start].suit === this.test_cache.flush.suit) {
                this.test_cache.straight_flush = true;
                return true;
            }
        }
    }
    //Straight flush from Ten to Ace
    private TestRoyalFlush(hand: Array<Card>, mainCards: Array<Card>) {
        return this.test_cache.straight_flush && this.test_cache.straight.start !== undefined && hand[this.test_cache.straight.start].value == 10;
    }
    computeHand(allcards: Array<Card>, mainCards: Array<Card>): HandValue {
        this.test_cache = {
            hicard: { suit: '', value: 0 },
            pair: { value: 0, index: -1 },
            two_pairs: {
                all_indices: [],
                pair_indices: []
            },
            three_of_a_kind: {
                value: 0,
                indices: []
            },
            four_of_a_kind: 0,
            straight: { result: false },
            flush: { result: false },
            straight_flush: false,
        };
        this.test_summary = {
            value: {},
            suit: {}
        }
        for (let i = 0; i < allcards.length; i++) {
            let suit = allcards[i].suit + '';
            let value = allcards[i].value;
            if (!this.test_summary.suit[suit])
                this.test_summary.suit[suit] = [i];
            else
                this.test_summary.suit[suit].push(i);
            if (!this.test_summary.value[value])
                this.test_summary.value[value] = [i];
            else
                this.test_summary.value[value].push(i);
        }
        const sorted_summary = this.TestSeries.map((t, i) => i == 0 ? t.fn.call(this, allcards, mainCards) : (t.fn.call(this, allcards, mainCards) ? (i + 14) : 0)).sort(VASC);
        const result = sorted_summary.pop();
        return {
            name: this.TestSeries[Math.max(result - 14, 0)].name,
            value: result
        };
    }
    compareHands(hands: Array<Array<Card>>, community: Array<Card>): Result {
        let ranks: Array<Rank> = hands.map((f, index) => {
            let hand = f.concat(community);
            return {
                ...this.computeHand(hand, f),
                index,
                cache: Object.assign([], this.test_cache),
                hand
            };
        }).sort(DESC);
        if (ranks[0].value > ranks[1].value) {
            let result: any = { type: "win", index: ranks[0].index, name: ranks[0].name };
            if (result.name == HAND_HICARD) result.suit = ranks[0].cache.hicard.suit;
            return result;
        } else {
            //console.log(JSON.stringify(ranks, null, 1));
            let highest_rank_name = ranks[0].name;
            let tieBreak = TieBreaker[highest_rank_name](ranks.filter(r => r.name == highest_rank_name));
            let result = {
                //test only the ranks same as highest rank
                ...tieBreak,
                //put the highest rank name
                name: tieBreak.tieBreakHiCard ? HAND_HICARD : highest_rank_name
            };
            return result;
        }
    }
    /*computeHandAllPartialStat(hand:Array<Card>){
        let stat = {
            hicard:0,
            pair:0,
            two_pairs:0,
            three_of_a_kind:0,
            straight:0,
            flush:0,
            full_house:0,
            four_of_a_kind:0,
            straight_flush:0,
            royal_flush:0
        };
        let result = this.computeHand(hand,hand);
        
    }*/
    /** TODO
    Maximum number of raises
    Most fixed-limit games will not allow more than a predefined number of raises in a betting round.
    The maximum number of raises depends on the casino house rules, and is usually posted conspicuously
    in the card room. Typically, an initial bet plus either three or four raises are allowed.

    Consider this example in a $20/$40 game, with a posted limit of a bet and three raises.
    During a $20 round with three players, play could proceed as follows:

    Player A bets $20.
    Player B puts in another bet, raises another $20, making it $40 to play.
    Player C puts in a third bet, raising another $20 on that, thus making it $60 to play.
    Player A puts in the fourth bet (they are usually said to cap the betting).
    Once Player A has made their final bet, Players B and C may only call another two and one
    bets (respectively); they may not raise again because the betting is capped.

    A common exception in this rule practiced in some card rooms is to allow unlimited raising
    when a pot is played heads up (when only two players are in the hand at the start of the
    betting round). Usually, this has occurred because all other players have folded, and only
    two remain, although it is also practiced when only two players get dealt in. Many card rooms
    will permit these two players to continue re-raising each other until one player is all in.
    */
}