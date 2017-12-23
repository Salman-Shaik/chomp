const Player=function(name){
  this.name=name;
  this.pips=[];
}
Player.prototype.hasLost = function () {
  return this.pips.includes("poisoned");
};
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

// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################
// ######################################################################

let game=new Game();

const reloadGame=function(){
  window.location.reload();
}

const isPoisoned=function(pip){
  return pip.id=="poisoned";
};

const updateDisplay=function(text){
  let display=document.getElementById('display');
  display.innerText=text;
};

const getGameStatus=function(){
  let gameStatus={};
  if(game.isCurrentPlayerLost()){
    gameStatus.status="won";
    gameStatus.winner=`${game.players[1-game.currentPlayerIndex].name}`;
  }
  else{
    gameStatus.status="isOn";
  }
  return gameStatus;
};
const removeClickListeners=function(){
  let chocolateBar=document.getElementById('chocolate_bar');
  chocolateBar.onclick="";
}
let action={};

action.won=function(gameStatus){
  updateDisplay(gameStatus.winner+" has Won.");
  removeClickListeners();
};

action.isOn=function(){
  updateDisplay(game.getCurrentPlayerInfo().name+" 's Turn.");
};

const clearColumn=function(pip){
  let id;
  let columns=[];
  do {
    id = +pip.id;
    pip.style.opacity = 0.5;
    columns.push(id);
    pip = document.getElementById(id - 10);
  }
  while (pip != undefined);
  return columns;
};

const clearRow=function(column){
  let id,pip;
  let rows=[];
  for (var i = 0; i < column.length; i++) {
    id=+column[i];
     pip = document.getElementById(id);
     do{
       pip.style.opacity = 0.5;
       id=id+1;
       rows.push(id);
       pip = document.getElementById(id);
    }
    while(pip != undefined);
  }
  return rows;
};

const clearPips = function(pip) {
  let columns=clearColumn(pip);
  let rows=clearRow(columns);
  return columns.concat(rows);
};
const updatePlayerPips=function(pips){
  pips.forEach((element) => {
    if(!game.getTotalPips().includes(element)){
      game.updatePlayerPips(element);
    }
  });
};

const updatePips=function(pip){
  if(!isPoisoned(pip)){
   let pips=clearPips(pip);
   updatePlayerPips(pips);
   game.currentPlayerIndex=1-game.currentPlayerIndex;
 }else{
   updatePlayerPips([pip.id]);
 }
  let gameStatus=getGameStatus();
  action[gameStatus.status](gameStatus);
};

const handleClickEvent=function(event){
  let pip=event.target;
  updatePips(pip);
};
const addClickListenerToResetButton=function(){
  let reset=document.getElementById('reset');
  reset.onclick=reloadGame;
}
const addClickListenersToTable=function(){
  let chocolateBar=document.getElementById('chocolate_bar');
  chocolateBar.onclick=handleClickEvent;
};

const startGame=function() {
  updateDisplay(game.getCurrentPlayerInfo().name+"'s Turn.");
  addClickListenersToTable();
  addClickListenerToResetButton();
};

window.onload=startGame;
