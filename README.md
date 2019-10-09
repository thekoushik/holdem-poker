# holdem-poker
Javascript Holdem Poker Engine

# Install
```shell
npm install holdem-poker --save
```

# API
### Game
- **constructor(playerMoney: Array&lt;number&gt;, initialBet: number)** ⇒
  Inititalizes the Game
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
- **raise(index: number, money: number): void** ⇒
  Raise by a player
- **call(index: number): void** ⇒
  Call by a player
- **fold(index: number): void** ⇒
  Fold by a player
- **endRound(): void** ⇒
  Ends the current round.
- **checkResult(): Result** ⇒
  Returns the result of the current round
- **computeHand(hand: Array&lt;Card&gt;): HandValue** ⇒
  Returns the max possible hand value. ***Note: Community cards are ignored.***

# Usage
```javascript
var {Game} = require('holdem-poker');
//initialize with 2 players, each having 100 unit money, and initial bet is 10 unit
var game=new Game([ 100, 100 ], 10);
//a demo gameplay is shown bellow
game.startRound();
//round 1
game.call(0);//for player 1
game.raise(1,20);//for player 2
game.endRound()
//round 2
game.call(0);//for player 1
game.call(1);//for player 2
game.endRound()
//round 3
game.raise(0,50);//for player 1
game.call(1);//for player 2
game.endRound()
//end game
var result=game.checkResult();
if(result.type=='win'){
 console.log('Player'+(result.index+1)+' won with '+result.name);
}else{
 console.log('Draw');
}
```