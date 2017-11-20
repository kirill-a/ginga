var demo = {};

demo.menu = function(){};
demo.menu.prototype = {
  preload: function(){
    game.load.image('title', './assets/backgrounds/title.png');
  },
  create: function(){
    game.add.sprite(0, 0, 'title');
    this.gameOverMessage = game.add.text(centerX, centerY + 100, "Press Z to start");
    //turn the text white
    this.gameOverMessage.fill = "#ffffff";
    //center the text
    this.gameOverMessage.anchor.set(0.5, 0.5);
    this.gameOverMessage.font = "Fresca";
  },
  update: function(){    
    startFromBeginning();
  }
};

function startFromBeginning() {
  if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
    changeState('level1');
  }
};