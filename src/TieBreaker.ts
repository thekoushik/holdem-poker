import { Rank } from "./Holdem";

const BreakTieUsingHiCard=(ranks:Array<Rank>)=>{
    let max_card_index=-1;
    let max_card_value=0;
    let max_card_map:any={};
    for(let i=0;i<ranks.length;i++){
        let hicard=ranks[i].cache.hicard.value;
        if(max_card_value<=hicard){
            max_card_value=hicard;
            max_card_index=i;
            if(!max_card_map[max_card_value])
                max_card_map[max_card_value]=1;
            else
                max_card_map[max_card_value]++;
        }
    }
    if(max_card_index>=0){
        if(max_card_map[max_card_value]==1){
            return {type:'win',index:ranks[max_card_index].index,value:max_card_value};
        }
    }
    return {type:'draw'};
}
export const TieBreaker:{ [key:string]:Function }={
    /**
     * When No Player Has Even A Pair, Then The Highest Card Wins. When Both Players Have Identical High Cards,
     * The Next Highest Card Wins, And So On Until Five Cards Have Been Used. In The Unusual Circumstance
     * That Two Players Hold The Identical Five Cards, The Pot Would Be Split.
     * 
     */
    "Hi Card":BreakTieUsingHiCard,
    /**
     * If Two Or More Players Hold A Single Pair Then Highest Pair Wins. If The Pairs Are Of The Same Value,
     * The Highest Kicker Card Determines The Winner. A Second And Even Third Kicker Can Be Used If Necessary
     */
    "Pair":(ranks:Array<Rank>)=>{
        let max_pair_index=-1;
        let max_pair_val=0;
        let max_pair_counter:any={};
        for(let i=0;i<ranks.length;i++){
            if(max_pair_val<=ranks[i].cache.pair.value){
                max_pair_val=ranks[i].cache.pair.value;
                max_pair_index=i;
                if(!max_pair_counter['max'+max_pair_val])
                    max_pair_counter['max'+max_pair_val]=[i];
                else
                    max_pair_counter['max'+max_pair_val].push(i);
            }
        }
        if(max_pair_index>=0){
            if(max_pair_counter['max'+max_pair_val].length==1){
                return {type:'win',index:ranks[max_pair_index].index,value:max_pair_val};
            }
            let candidates=max_pair_counter['max'+max_pair_val].map((m:number)=>{
                let pair_value=ranks[m].cache.pair.value
                return {
                    ...ranks[m],
                    hand:ranks[m].hand.filter(f=>f.value!=pair_value)
                }
            });
            return TieBreaker["Hi Card"](candidates);
        }
        return {type:'draw'};
    },
    /**
     * The Highest Pair Is Used To Determine The Winner. If Two Or More Players Have The Same Highest Pair,
     * Then The Highest Of The Second Pair Determines The Winner. If Both Players Hold Identical Two Pairs,
     * The Fifth Card Is Used To Break The Tie.
     */
    "Two pairs":(ranks:Array<Rank>)=>{
        for(let check_highest=0;check_highest<2;check_highest++){
            let max_pair_index=-1;
            let max_pair_val=0;
            let max_pair_counter:any={};
            for(let i=0;i<ranks.length;i++){
                let [pa,pb]=ranks[i].cache.two_pairs.pair_indices;
                let my_highest_pair_index;
                if(ranks[i].hand[pa].value<ranks[i].hand[pb].value){
                    my_highest_pair_index=check_highest==0?pb:pa;
                }else{
                    my_highest_pair_index=check_highest==0?pa:pb;
                }
                if(max_pair_val<=ranks[i].hand[my_highest_pair_index].value){
                    max_pair_val=ranks[i].hand[my_highest_pair_index].value;
                    max_pair_index=i;
                    if(!max_pair_counter['max'+max_pair_val])
                        max_pair_counter['max'+max_pair_val]=[i];
                    else
                        max_pair_counter['max'+max_pair_val].push(i);
                }
            }
            if(max_pair_index>=0){
                if(max_pair_counter['max'+max_pair_val].length==1){
                    return {type:'win',index:ranks[max_pair_index].index,value:max_pair_val};
                }
            }
        }
        //compare the last card
        let max_hand_value=0;
        let max_hand_index=-1;
        let max_hand_counter:any={};
        for(let i=0;i<ranks.length;i++){
            let hand=ranks[i].hand;
            ranks[i].cache.two_pairs.all_indices.sort((a,b)=>b-a).forEach(f=>hand.splice(f,1));
            if(max_hand_value<=hand[0].value){
                max_hand_index=i;
                max_hand_value=hand[0].value;
                if(!max_hand_counter['max'+max_hand_value])
                    max_hand_counter['max'+max_hand_value]=1;
                else
                    max_hand_counter['max'+max_hand_value]++;
            }
        }
        if(max_hand_index>=0){
            if(max_hand_counter['max'+max_hand_value]==1)
                return {type:'win',index:ranks[max_hand_index].index,value:max_hand_value}
        }
        return {type:'draw'};
    },
    /**
     * If More Than One Player Holds Three Of A Kind, Then The Higher Value Of The Cards Used To Make
     * The Three Of A Kind Determines The Winner. If Two Or More Players Have The Same Three Of A Kind,
     * Then A Fourth Card (And A Fifth If Necessary) Can Be Used As Kickers To Determine The Winner.
     */
    "Three of a kind":(ranks:Array<Rank>)=>{
        let max_pair_index=-1;
        let max_pair_val=0;
        let max_pair_counter:any={};
        for(let i=0;i<ranks.length;i++){
            let val=ranks[i].cache.three_of_a_kind.value;
            if(max_pair_val<=val){
                max_pair_val=val;
                max_pair_index=i;
                if(!max_pair_counter['max'+max_pair_val])
                    max_pair_counter['max'+max_pair_val]=[i];
                else
                    max_pair_counter['max'+max_pair_val].push(i);
            }
        }
        if(max_pair_index>=0){
            if(max_pair_counter['max'+max_pair_val].length==1){
                return {type:'win',index:ranks[max_pair_index].index,value:max_pair_val};
            }
            let candidates=max_pair_counter['max'+max_pair_val].map((m:number)=>{
                let pair_value=ranks[m].cache.three_of_a_kind.value;
                return {
                    ...ranks[m],
                    hand:ranks[m].hand.filter(f=>f.value!=pair_value)
                }
            });
            return TieBreaker["Hi Card"](candidates);
        }
        return {type:'draw'};
    },
    /**
     * A Straight Is Any Five Cards In Sequence, But Not Necessarily Of The Same Suit. If More Than
     * One Player Has A Straight, The Straight Ending In The Card Wins. If Both Straights End In A Card
     * Of The Same Strength, The Hand Is Tied.
     */
    "Straight":BreakTieUsingHiCard,
    /**
     * A Flush Is Any Hand With Five Cards Of The Same Suit. If Two Or More Players Hold A Flush,
     * The Flush With The Highest Card Wins. If More Than One Player Has The Same Strength High
     * Card, Then The Strength Of The Second Highest Card Held Wins. This Continues Through The Five
     * Highest Cards In The Player's Hands.
     */
    "Flush":BreakTieUsingHiCard,
    /**
     * When Two Or More Players Have Full Houses, We Look First At The Strength Of The Three Of A
     * Kind To Determine The Winner. For Example, Aces Full Of Deuces (AAA22) Beats Kings Full Of
     * Jacks (KKKJJ). If There Are Three Of A Kind On The Table (Community Cards) In A Texas Holdem
     * Game That Are Used By Two Or More Players To Make A Full House, Then We Would Look At The
     * Strength Of The Pair To Determine A Winner.
     */
    "Full House":(ranks:Array<Rank>)=>{
        for(let check_3k=0;check_3k<2;check_3k++){
            let max_3k_index=-1;
            let max_3k_val=-1;
            let max_3k_counter:any={};
            for(let i=0;i<ranks.length;i++){
                let val=ranks[i].cache[check_3k==0?'three_of_a_kind':'pair'].value;
                if(max_3k_val<=val){
                    max_3k_index=i;
                    if(!max_3k_counter[max_3k_val])
                        max_3k_counter[max_3k_val]=1;
                    else
                        max_3k_counter[max_3k_val]++;
                }
            }
            if(max_3k_index>=0){
                if(max_3k_counter[max_3k_val]==1){
                    return {type:'win',index:ranks[max_3k_index].index,value:max_3k_val}
                }
            }
        }
        return {type:'draw'};
    },
    /**
     * This One Is Simple. Four Aces Beats Any Other Four Of A Kind, Four Kings Beats Four Queens
     * Or Less And So On. The Only Tricky Part Of A Tie Breaker With Four Of A Kind Is When The Four
     * Falls On The Table In A Game Of Texas Holdem And Is Therefore Shared Between Two (Or More)
     * Players. A Kicker Can Be Used, However, If The Fifth Community Card Is Higher Than Any Card
     * Held By Any Player Still In The Hand, Then The Hand Is Considered A Tie And The Pot Is Split.
     */
    "Four of a kind":(ranks:Array<Rank>)=>{
        for(let check_4k=0;check_4k<2;check_4k++){
            let max_4k_index=-1;
            let max_4k_val=0;
            let max_4k_counter:any={};
            for(let i=0;i<ranks.length;i++){
                let val=ranks[i].cache.four_of_a_kind;
                if(check_4k==1){
                    try{
                        val=ranks[i].hand.filter(f=>f.value!=val)[0].value
                    }catch(e){
                        break;
                    }
                }
                if(max_4k_val<=val){
                    max_4k_val=val;
                    max_4k_index=i;
                    if(!max_4k_counter[max_4k_val])
                        max_4k_counter[max_4k_val]=1;
                    else
                        max_4k_counter[max_4k_val]++;
                }
            }
            if(max_4k_index>=0){
                if(max_4k_counter[max_4k_val]==1)
                    return {type:'win',index:ranks[max_4k_index].index,value:max_4k_val};
            }
        }
        return {type:'draw'};
    },
    /**
     * Straight Flushes Come In Varying Strengths From Five High To A King High. A King High Straight
     * Flush Loses Only To A Royal. If More Than One Player Has A Straight Flush, The Winner Is The
     * Player With The Highest Card Used In The Straight. A Queen High Straight Flush Beats A Jack
     * High And A Jack High Beats A Ten High And So On. The Suit Never Comes Into Play I.E. A Seven
     * High Straight Flush Of Diamonds Will Split The Pot With A Seven High Straight Flush Of Hearts.
     */
    "Straight flush":BreakTieUsingHiCard,
    /**
     * An Ace-High Straight Flush Is Called Royal Flush. A Royal Flush Is The Highest Hand In Poker.
     * Between Two Royal Flushes, There Can Be No Tie Breaker. If Two Players Have Royal Flushes,
     * They Split The Pot.
     */
    "Royal flush":(ranks:Array<Rank>)=>{
        return {type:'draw'};
    }
}