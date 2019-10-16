# holdem-poker
Javascript Holdem Poker Engine

# Install
```shell
npm install holdem-poker --save
```

# API
### Suit
string with value any one of **CLUB**, **DIAMOND**, **HEART**, **SPADE**

### Card
- suit: Suit
- value: number
>Note: value is in the range from 2 to 14 where 11 = J, 12 = Q, 13 = K and 14 = A

### Game
- **constructor(playerMoney: Array&lt;number&gt;, initialBet: number)** ⇒
  Inititalizes the Game. The deck is shuffled randomly with 'Fisher-Yates' algorithm.
  Number of players will be the same length as ***playerMoney*** 
- **getPlayers(): Player[]** ⇒
  Returns the array of player
- **getRound(): Round[]** ⇒
  Returns the current round. This Array represents each players' current investment and decision
- **getPot(): number** ⇒
  Returns the current pot amount
- **getTable(): Card[]** ⇒
  Returns the current community cards
- **startRound(): void** ⇒
  Starts the round if not started yet
- **bet(index: number): void** ⇒
  Bet the initial betting amount(only in the opening round)
- **check(index: number): void** ⇒
  Bet 0 unit of money(only after the opening round)
- **raise(index: number, money: number): void** ⇒
  Raise by a player(can re-raise in the same round)
- **call(index: number): void** ⇒
  Match the highest bet in the same round
- **fold(index: number): void** ⇒
  Fold by a player
- **canEndRound(): boolean** ⇒
  Whether the current round can be ended
- **endRound(): void** ⇒
  Ends the current round.
- **checkResult(): Result** ⇒
  Returns the result of the current round
- **computeHand(hand: Array&lt;Card&gt;): HandValue** ⇒
  Returns the max possible hand value. ***Note: Community cards are ignored.***

# Usage
## Browser
```javascript
var game = Poker.Game(...)
```
## Node
```javascript
var {Game} = require('holdem-poker');
var game=new Game(...);
```
### Example:
```javascript
var {Game} = require('holdem-poker');
//initialize with 2 players, each having 100 unit money, and initial bet is 10 unit
var game=new Game([ 100, 100 ], 10);
//a demo gameplay is shown bellow
console.log('Players',game.getPlayers().map(function(m){return m.hand}))
//round 1
game.startRound();
game.bet(0);//for player 1
game.raise(1,20);//for player 2
game.call(0)
game.endRound()
console.log('Table',game.getTable());
//round 2
game.startRound();
game.check(0);//for player 1
game.check(1);//for player 2
game.endRound()
console.log('Table',game.getTable());
//round 3
game.startRound();
game.raise(0,50);//for player 1
game.call(1);//for player 2
game.endRound()
console.log('Table',game.getTable());
//end game
var result=game.checkResult();
if(result.type=='win'){
    console.log('Player'+(result.index+1)+' won with '+result.name);
}else{
    console.log('Draw');
}
```
