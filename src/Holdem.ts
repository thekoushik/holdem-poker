import { Card } from "./Card";
import { TieBreaker } from "./TieBreaker";

export const DESC=(a:any,b:any):number=>b.value-a.value;
const ASC=(a:Card,b:Card):number=>a.value-b.value;
const VASC=(a:number,b:number):number=>a-b;

const HAND_HICARD="Hi Card";
const HAND_PAIR="Pair";
const HAND_TWOPAIRS="Two pairs";
const HAND_THREEOFAKIND="Three of a kind";
const HAND_STRAIGHT="Straight";
const HAND_FLUSH="Flush";
const HAND_FULLHOUSE="Full House";
const HAND_FOUROFAKIND="Four of a kind";
const HAND_STRAIGHTFLUSH="Straight flush";
const HAND_ROYALFLUSH="Royal flush";

export interface HandValue{
    name:string;
    value:number;
}
interface TestCache{
    hicard:{
        suit:string,
        value:number
    },
    pair:{
        value:number,
        index:number
    };
    two_pairs:{
        all_indices:Array<number>,
        pair_indices:Array<number>
    };
    three_of_a_kind:{
        value:number,
        indices:Array<number>
    };
    four_of_a_kind:number,
    straight:any;
    flush:any;
    straight_flush:boolean;
}
export interface Rank{
    index: number;
    cache: TestCache;
    hand: Card[];
    name: string;
    value: number;
}

export class Holdem{
    private test_cache:TestCache={
        hicard:{
            suit:'',
            value:0
        },
        pair:{
            value:0,
            index:-1
        },
        two_pairs:{
            all_indices:[],
            pair_indices:[]
        },
        three_of_a_kind:{
            value:0,
            indices:[]
        },
        four_of_a_kind:0,
        straight:{result:false},
        flush:{result:false},
        straight_flush:false,
    };
    private test_summary:{
        value:{
            [key:number]:Array<number>
        },
        suit:{
            [key:string]:Array<number>
        }
    }={
        value:{},
        suit:{}
    };
    private TestSeries:{name:string,fn:Function}[]=[
        {name:HAND_HICARD,fn:this.TestHicard},
        {name:HAND_PAIR,fn:this.TestPair},
        {name:HAND_TWOPAIRS,fn:this.TestTwoPairs},
        {name:HAND_THREEOFAKIND,fn:this.TestThreeOfAKind},
        {name:HAND_STRAIGHT,fn:this.TestStraight},
        {name:HAND_FLUSH,fn:this.TestFlush},
        {name:HAND_FULLHOUSE,fn:this.TestFullHouse},
        {name:HAND_FOUROFAKIND,fn:this.TestFourOfAKind},
        {name:HAND_STRAIGHTFLUSH,fn:this.TestStraightFlush},
        {name:HAND_ROYALFLUSH,fn:this.TestRoyalFlush}
    ];
    //Simple value of the card. Lowest: 2 - Highest: Ace(14)
    private TestHicard(hand:Array<Card>){
        let card=hand.slice(0).sort(DESC)[0];
        this.test_cache.hicard={suit: card.suit+'', value: card.value};
        return card.value;
    }
    //Two cards with the same value
    private TestPair(hand:Array<Card>){
        for(let key in this.test_summary.value)
            if(this.test_summary.value[key].length==2){
                this.test_cache.pair={value:Number(key),index:this.test_summary.value[key][0]};
                return true;
            }
        return false;
    }
    //Two times two cards with the same value
    private TestTwoPairs(hand:Array<Card>){
        let all_indices:number[]=[];
        let pair_indices:number[]=[];
        for(let key in this.test_summary.value){
            if(this.test_summary.value[key].length==2){
                let [a,b]=this.test_summary.value[key];
                pair_indices.push(a);
                all_indices.push(a);
                all_indices.push(b);
            }
        }
        if(pair_indices.length==2){
            this.test_cache.two_pairs={all_indices,pair_indices};
            return true;
        }
    }
    //Three cards with the same value
    private TestThreeOfAKind(hand:Array<Card>){
        for(let key in this.test_summary.value){
            if(this.test_summary.value[key].length==3){
                this.test_cache.three_of_a_kind.value=Number(key);
                this.test_cache.three_of_a_kind.indices=this.test_summary.value[key];
                return true;
            }
        }
    }
    //Sequence of 5 cards in increasing value (Ace can precede 2 and follow up King)
    private TestStraight(hand:Array<Card>){
        let seq_count=0;
        let seq_start=-1;
        let seq=hand.slice(0).sort(ASC);
        for(let i=0;i<seq.length-1;i++){
            if(seq[i].value===seq[i+1].value-1){
                if(seq_start<0) seq_start=i;
                seq_count++;
            }else if(seq_count<3){
                seq_count=0;
                seq_start=-1;
            }
        }
        let result:boolean=seq_count>3 || (seq_count==3 && seq_start==0 && seq[seq.length-1].value==14);
        this.test_cache.straight.result=result;
        if(result){
            this.test_cache.straight.start=hand.findIndex((f:Card)=>f.suit==seq[seq_start].suit && f.value==seq[seq_start].value);
        }
        return result;
    }
    //5 cards of the same suit
    private TestFlush(hand:Array<Card>){
        for(let key in this.test_summary.suit){
            if(this.test_summary.suit[key].length==5){
                this.test_cache.flush={suit:key,result:true};
                return true;
            }
        }
        this.test_cache.flush={
            result:false
        };
    }
    //Combination of three of a kind and a pair
    private TestFullHouse(hand:Array<Card>){
        if(this.test_cache.three_of_a_kind.indices.length==3 && this.test_cache.pair.value>=2){
            return this.test_cache.three_of_a_kind.value!==this.test_cache.pair.value;
        }
    }
    //Four cards of the same value
    private TestFourOfAKind(hand:Array<Card>){
        for(let key in this.test_summary.value){
            if(this.test_summary.value[key].length==4){
                this.test_cache.four_of_a_kind=Number(key);
                return true;
            }
        }
    }
    //Straight of the same suit
    private TestStraightFlush(hand:Array<Card>){
        if(this.test_cache.straight.result && this.test_cache.flush.result){
            if(hand[this.test_cache.straight.start].suit==this.test_cache.flush.suit){
                this.test_cache.straight_flush=true;
                return true;
            }
        }
    }
    //Straight flush from Ten to Ace
    private TestRoyalFlush(hand:Array<Card>){
        return this.test_cache.straight_flush && hand[this.test_cache.straight.start].value==10;
    }
    computeHand(hand:Array<Card>):HandValue{
        this.test_cache={
            hicard:{suit:'',value:0},
            pair:{value:0,index:-1},
            two_pairs:{
                all_indices:[],
                pair_indices:[]
            },
            three_of_a_kind:{
                value:0,
                indices: []
            },
            four_of_a_kind:0,
			straight:{result:false},
			flush:{result:false},
			straight_flush:false,
        };
        this.test_summary={
            value:{},
            suit:{}
        }
        for(let i=0;i<hand.length;i++){
            let suit=hand[i].suit+'';
            let value=hand[i].value;
            if(!this.test_summary.suit[suit])
                this.test_summary.suit[suit]=[i];
            else
                this.test_summary.suit[suit].push(i);
            if(!this.test_summary.value[value])
                this.test_summary.value[value]=[i];
            else
                this.test_summary.value[value].push(i);
        }
        let result=this.TestSeries.map((t,i)=>i==0?t.fn.call(this,hand):(t.fn.call(this,hand)?(i+14):0)).sort(VASC).pop();
		return {
            name: this.TestSeries[Math.max(result-14,0)].name,
            value: result
        };
    }
    compareHands(hands:Array<Array<Card>>,community:Array<Card>){
		let ranks:Array<Rank>=hands.map((f,index)=>{
            let hand=f.concat(community);
			return {
				...this.computeHand(hand),
				index,
                cache:this.test_cache,
                hand:hand
			};
		}).sort(DESC);
		if(ranks[0].value>ranks[1].value){
            let result:any={type:"win",index:ranks[0].index,name:ranks[0].name};
            if(result.name==HAND_HICARD) result.suit=ranks[0].cache.hicard.suit;
			return result;
		}else{
            //console.log(ranks);
            let highest_rank_name=ranks[0].name;
            let result={
                //test only the ranks same as highest rank
                ...TieBreaker[highest_rank_name](ranks.filter(r=>r.name==highest_rank_name)),
                //put the highest rank name
                name:highest_rank_name
            };
			return result;
		}
    }
}