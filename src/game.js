const Player = require('./player.js');

const Game=function(){
  this.players=[];
  this.players.push(new Player("Player1"));
  this.players.push(new Player("Player2"));
  this.currentPlayerIndex=0;
}
Game.prototype.getCurrentPlayerInfo = function () {
  return this.players[this.currentPlayerIndex];
};

Game.prototype.updatePlayerPips=function(pip){
  this.players[this.currentPlayerIndex].pips.push(pip);
};

Game.prototype.getTotalPips=function(){
  return this.players[0].pips.concat(this.players[1].pips);
};

Game.prototype.isCurrentPlayerLost=function(){
  return this.players[this.currentPlayerIndex].hasLost();
};
module.exports=Game;
