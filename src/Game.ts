import { Deck } from "./deck";
import { Card } from "./Card";
import { Holdem, HandValue, Result } from "./Holdem";

interface Player{
    money:number;
    hand:Array<Card>;
    folded:boolean;
    active:boolean;
}
/**
 * Round represents a player's current investment and decision
 */
interface Round{
    money:number;
    decision?:"fold"|"raise"|"call"|"check"|"bet";
}
/**
 * Represents game state
 */
export interface GameState{
    /**
     * Current pot amount
     */
    pot:number;
    /**
     * Community cards at the table
     */
    communityCards:Array<Card>;
    /**
     * Player statuses
     */
    players:Array<{
        /**
         * Amount of money a player have
         */
        money:number,
        /**
         * Player cards
         */
        hand:Array<Card>,
        /**
         * Whether the player already folded
         */
        folded:boolean,
        /**
         * Is the player left the game or not
         */
        active:boolean,
        /**
         * Current decision the player has made
         */
        currentDecision:string,
        /**
         * Betting amount for current round
         */
        currentBet:number,
        /**
         * Actions the player can take at the moment
         */
        availableActions:Array<string>
    }>;
}

export class Game{
    private pot:number=0;
    private players:Array<Player>=[];
    private deck:Deck=new Deck();
    private table:Array<Card>=[];
    private round:Array<Round>=[];
    private __instance:Holdem=new Holdem();
    private initialBet:number;
    private __roundStates:Array<Array<Round>>=[];
    /**
     * Inititalizes the Game
     * 
     * @param playerMoney   Array of player money to start with, number of players will be of same length
     * @param initialBet    Minimum betting amount to start with
     */
    constructor(playerMoney:Array<number>,initialBet:number){
        this.initialBet=initialBet;
        this.newRound(playerMoney);
    }
    /**
     * Starts a new game round
     * 
     * @param playerMoney Money for individual players
     */
    private newRound(playerMoney:Array<number>):void{
        this.pot=0;
        this.deck=new Deck();
        this.deck.shuffle();
        this.table=[];
        this.round=[];
        this.__roundStates=[];
        this.players=playerMoney.map((money:number)=>{
            return {
                money,
                hand:this.deck.getCards(2),
                folded:false,
                active:true
            }
        });
    }
    /**
     * Returns the current game state
     */
    getState():GameState{
        return {
            communityCards: this.table.slice(0),
            pot: this.round.reduce((a,c)=>a+c.money,this.pot),
            players:this.players.map((p,i)=>{
                let availableActions:Array<string>=[];
                if(p.active){
                    if(this.table.length==0){
                        availableActions.push("bet","fold");
                    }else if(this.round.length){
                        if(this.round[i].decision!="fold"){
                            availableActions.push("raise","call","check","fold")
                        }
                    }
                }
                return {
                    money:p.money,
                    hand:p.hand,
                    folded:p.folded,
                    active:p.active,
                    currentDecision:(this.round.length && this.round[i].decision)||'',
                    currentBet:(this.round.length && this.round[i].money)||0,
                    availableActions
                }
            })
        }
    }
    /**
     * Starts the round if not started yet
     */
    startRound():void{
        let activePlayers=0;
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].money<0)
                this.players[i].active=false;
            else{
                activePlayers++;
            }
            this.round[i]={
                money:0,//this.players[i].active?this.initialBet:0
            };
        }
        if(activePlayers==1){
            this.round=[];
            throw new Error("Game cannot continue")
        }
    }
    /**
     * Bet the initial betting amount
     * 
     * @param index Player index
     */
    bet(index:number):void{
        if(!this.round.length) throw new Error("Game round not started");
        if(this.round[index].decision) throw new Error("Please proceed to next round");
        this.round[index].money=this.initialBet;
        this.round[index].decision="bet";
    }
    /**
     * Bet 0 unit of money
     * 
     * @param index Player index
     */
    check(index:number):void{
        if(!this.round.length) throw new Error("Game round not started");
        if(this.round[index].decision) throw new Error("Please proceed to next round");
        if(this.table.length==0) throw new Error("Cannot check in opening round");
        this.round[index].money=0;
        this.round[index].decision="check";
    }
    /**
     * Raise by a player
     * 
     * @param index Player index
     * @param money Raise amount
     */
    raise(index:number,money:number):void{
        if(!this.round.length) throw new Error("Game round not started");
        if(this.players[index].money<money) throw new Error('Too much');
        if(this.round[index].decision && this.round[index].decision!="raise") throw new Error("Please proceed to next round");
        let raised_money=money;
        if(!this.table.length) raised_money=money+this.initialBet;
        this.round[index].money=raised_money;
        this.round[index].decision="raise";
    }
    /**
     * Call by a player
     * 
     * @param index Player index
     */
    call(index:number):void{
        if(!this.round.length) throw new Error("Game round not started");
        //if(this.round[index].decision) throw new Error("Please proceed to next round");
        let max_money=this.round.slice(0).sort((a,b)=>b.money-a.money)[0].money;
        if(max_money==0) max_money=this.initialBet;//fall back to initial betting amount
        this.round[index].money=max_money;
        this.round[index].decision="call";
    }
    /**
     * Fold by a player
     * 
     * @param index Player index
     */
    fold(index:number):void{
        if(!this.round.length) throw new Error("Game round not started");
        if(this.round[index].decision) throw new Error("Please proceed to next round");
        this.round[index].decision="fold";
        this.players[index].folded=true;
    }
    /**
     * Whether the current round can be ended
     */
    canEndRound(){
        let last_amount=-1;
        for(let i=0;i<this.round.length;i++){
            if(this.round[i].decision=="fold") continue;
            let money=this.round[i].money;
            if(last_amount<0)
                last_amount=money;
            else if(money!=last_amount)
                return false;
        }
        return true;
    }
    /**
     * Ends the current round.
     */
    endRound():void{
        if(!this.round.length) throw new Error("Game round not started");
        if(this.__roundStates.length==4) throw new Error("Round is over, please invoke checkResult");
        let last_amount=-1;
        let pot=0;
        for(let i=0;i<this.round.length;i++){
            if(this.round[i].decision=="fold") continue;
            let money=this.round[i].money;
            if(last_amount<0)
                last_amount=money;
            else if(money!=last_amount)
                throw new Error("Round is not over yet, please call or raise.");
            pot+=money;
        }
        this.pot+=pot;
        this.__roundStates.push(this.round.slice(0));
        if(this.__roundStates.length<4){
            let communityCardCountForThisRound=1;
            if(this.table.length==0) communityCardCountForThisRound=3;
            this.table.push.apply(this.table,this.deck.getCards(communityCardCountForThisRound));
        }
    }
    /**
     * Returns the result of the current round
     */
    checkResult():Result{
        let result=this.__instance.compareHands(this.players.map(m=>m.hand),this.table);
        if(result.type=='win'){
            if(result.index!=undefined)
                this.players[result.index].money+=this.pot;
            else
                throw new Error("This error will never happen");
        }else{//draw
            //split the pot among non-folded players
            let splitCount=this.players.filter(f=>!f.folded).length;
            if(splitCount>0){
                let eachSplit=this.pot/splitCount;
                for(let i=0;i<this.players.length;i++){
                    if(!this.players[i].folded)
                        this.players[i].money+=eachSplit;
                }
            }
        }
        this.newRound(this.players.map(m=>m.money));
        return result;
    }
    /**
     * Returns the max possible hand value.
     * Note: Community cards are ignored.
     * 
     * @param hand Array of cards
     */
    computeHand(hand:Array<Card>):HandValue{
        return this.__instance.computeHand(hand,hand);
    }
}

