const Player=function(name){
  this.name=name;
  this.pips=[];
}
Player.prototype.hasLost = function () {
  return this.pips.includes("poisoned");
};
module.exports=Player;
