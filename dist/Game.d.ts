import { Card } from "./Card";
import { HandValue, Result } from "./Holdem";
/**
 * Represents game state
 */
export interface GameState {
    /**
     * Current pot amount
     */
    pot: number;
    /**
     * Community cards at the table
     */
    communityCards: Array<Card>;
    /**
     * Player statuses
     */
    players: Array<{
        /**
         * Amount of money a player have
         */
        money: number;
        /**
         * Player cards
         */
        hand: Array<Card>;
        /**
         * Whether the player already folded
         */
        folded: boolean;
        /**
         * Is the player left the game or not
         */
        active: boolean;
        /**
         * Current decision the player has made
         */
        currentDecision: string;
        /**
         * Betting amount for current round
         */
        currentBet: number;
        /**
         * Actions the player can take at the moment
         */
        availableActions: Array<string>;
    }>;
}
export declare class Game {
    private pot;
    private players;
    private deck;
    private table;
    private round;
    private __instance;
    private initialBet;
    private __roundStates;
    /**
     * Inititalizes the Game
     *
     * @param playerMoney   Array of player money to start with, number of players will be of same length
     * @param initialBet    Minimum betting amount to start with
     */
    constructor(playerMoney: Array<number>, initialBet: number);
    /**
     * Starts a new game round
     *
     * @param playerMoney Money for individual players
     */
    private newRound;
    /**
     * Returns the current game state
     */
    getState(): GameState;
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
