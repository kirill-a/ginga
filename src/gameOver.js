demo.gameOver = function () {}
demo.gameOver.prototype = {
  preload: function () {},
  create: function () {
    game.stage.backgroundColor = '#694156'
    if (continueCount > 0) {
      this.gameOverMessage = game.add.text(game.world.centerX, game.world.centerY,
        'GAME OVER\nYour score is ' + highscore + '\nPress Z to start again\nPress C to continue ' + continueCount)
    } else {
      this.gameOverMessage = game.add.text(game.world.centerX, game.world.centerY,
        'GAME OVER\nYour score is ' + highscore + '\nPress Z to start again')
    }
    this.gameOverMessage.fill = '#ffffff'
    this.gameOverMessage.anchor.set(0.5, 0.5)
    this.gameOverMessage.font = 'Candal'
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.C) && continueCount != 0) {
      highscore = 0
      continueCount -= 1
      changeState('level' + currentLevel)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      highscore = 0
      changeState('level1')
    }
  }
}
