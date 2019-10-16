import { Card } from "./Card";
import { HandValue, Result } from "./Holdem";
export interface Player {
    money: number;
    hand: Array<Card>;
    folded: boolean;
    active: boolean;
}
/**
 * Round represents a player's current investment and decision
 */
export interface Round {
    money: number;
    decision?: "fold" | "raise" | "call" | "check" | "bet";
}
export declare class Game {
    private pot;
    private players;
    private deck;
    private table;
    private round;
    private __instance;
    private initialBet;
    /**
     * Inititalizes the Game
     *
     * @param playerMoney   Number of players will be the same length as
     * @param initialBet    Minimum amount to start with
     */
    constructor(playerMoney: Array<number>, initialBet: number);
    /**
     * Starts a new game round
     *
     * @param playerMoney Money for individual players
     */
    private newRound;
    /**
     * Returns the array of player
     */
    getPlayers(): Player[];
    /**
     * Returns the current round. This Array represents each players' current investment and decision
     */
    getRound(): Round[];
    /**
     * Returns the current pot amount
     */
    getPot(): number;
    /**
     * Returns the current community cards
     */
    getTable(): Card[];
    /**
     * Starts the round if not started yet
     */
    startRound(): void;
    /**
     * Bet the initial betting amount
     *
     * @param index Player index
     */
    bet(index: number): void;
    /**
     * Bet 0 unit of money
     *
     * @param index Player index
     */
    check(index: number): void;
    /**
     * Raise by a player
     *
     * @param index Player index
     * @param money Raise amount
     */
    raise(index: number, money: number): void;
    /**
     * Call by a player
     *
     * @param index Player index
     */
    call(index: number): void;
    /**
     * Fold by a player
     *
     * @param index Player index
     */
    fold(index: number): void;
    /**
     * Whether the current round can be ended
     */
    canEndRound(): boolean;
    /**
     * Ends the current round.
     */
    endRound(): void;
    /**
     * Returns the result of the current round
     */
    checkResult(): Result;
    /**
     * Returns the max possible hand value.
     * Note: Community cards are ignored.
     *
     * @param hand Array of cards
     */
    computeHand(hand: Array<Card>): HandValue;
}
