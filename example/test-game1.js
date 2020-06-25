/*
Each player is dealt two private cards ("Hole Cards" or "Pocket Cards"), after which there is a betting round.
Then three community cards are dealt face up (the "Flop"), followed by a second betting round. A fourth
community card is dealt face up (the "Turn"), followed by a third betting round. A fifth community card is
dealt face up (the "River")and the the fourth and final betting round. At the Showdown, each player plays the
best five-card hand they can make using any five cards from the two pocket cards and the five community cards
(or Board Cards).
*/
var {Game} = require('..');
//initialize with 2 players, each having 100 unit money, and initial bet is 10 unit
var game=new Game([ 100, 100 ], 10);
//a demo gameplay is shown bellow
console.log('Players',game.getState().players.map(function(m){return m.hand}))
//round 1
game.startRound();
game.bet(0);//for player 1
game.raise(1,20);//for player 2
game.call(0)
game.endRound()
console.log('Table',game.getState().communityCards);
//round 2
game.startRound();
game.check(0);//for player 1
game.check(1);//for player 2
game.endRound()
console.log('Table',game.getState().communityCards);
//round 3
game.startRound();
game.raise(0,50);//for player 1
game.call(1);//for player 2
game.endRound()
console.log('Table',game.getState().communityCards);
//round 4
game.startRound();
game.call(0);//for player 1
game.call(1);//for player 2
game.endRound()
//end game
var result=game.checkResult();
if(result.type=='win'){
    console.log('Player'+(result.index+1)+' won with '+result.name);
}else{
    console.log('Draw');
}