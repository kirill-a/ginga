demo.gameOver = function(){};
demo.gameOver.prototype = {
  preload: function(){},
  create: function(){
    addChangeStateEventListeners();
    game.stage.backgroundColor = '#000000';
  },
  update: function(){}
};