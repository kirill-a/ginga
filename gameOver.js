demo.gameOver = function(){};
demo.gameOver.prototype = {
  preload: function(){
    game.load.audio('end', 'assets/bgm/end.ogg');
  },
  create: function(){
    game.stage.backgroundColor = '#777000';
    //make a text field
    this.gameOverMessage = game.add.text(centerX, centerY, "GAME OVER \n Press Z to start again");
    //turn the text white
    this.gameOverMessage.fill = "#ffffff";
    //center the text
    this.gameOverMessage.anchor.set(0.5, 0.5);
    this.gameOverMessage.font = "Fresca";
    theme = game.add.audio('end', 0.3, true);
    theme.play();
  },
  update: function(){
    startFromBeginning();
  }
};
