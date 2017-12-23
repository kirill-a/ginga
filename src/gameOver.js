demo.gameOver = function () {}
demo.gameOver.prototype = {
  preload: function () {},
  create: function () {
    game.stage.backgroundColor = '#694156'
    if (manager.continueCount > 0) {
      this.gameOverMessage = game.add.text(game.world.centerX, game.world.centerY,
        'GAME OVER\nYour score is ' + manager.highscore + '\nPress C to start again\nPress Z to continue ' + manager.continueCount)
    } else {
      this.gameOverMessage = game.add.text(game.world.centerX, game.world.centerY,
        'GAME OVER\nYour score is ' + manager.highscore + '\nPress C to start again')
    }
    this.gameOverMessage.fill = '#ffffff'
    this.gameOverMessage.anchor.set(0.5, 0.5)
    this.gameOverMessage.font = 'Candal'
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z) && manager.continueCount != 0) {
      manager.highscore = 0
      manager.continueCount -= 1
      game.state.start('level' + manager.currentLevel)
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.C)) {
      manager.highscore = 0
      game.state.start('level1')
    }
  }
}
