const loadChompGame=function(){
  window.location.href="src/main.html";
};

const loadReverseChompGame=function(){
  window.location.href="src/reversemain.html";
};

const loadGameHelp=function(){
  window.location.href="src/help.html";
};

const addClickListenersToButtons=function(){
  let reverseChomp=document.getElementById('reverse_chomp');
  let chomp=document.getElementById('chomp');
  let help=document.getElementById('help');
  chomp.onclick=loadChompGame;
  reverseChomp.onclick=loadReverseChompGame;
  help.onclick=loadGameHelp;
}

const begin=function(){
  addClickListenersToButtons();
}
window.onload=begin;
