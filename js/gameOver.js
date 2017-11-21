var gameOverTheme
demo.gameOver = function () {}
demo.gameOver.prototype = {
  preload: function () {},
  create: function () {
    game.stage.backgroundColor = '#694156'
    this.gameOverMessage = game.add.text(centerX, centerY, 'GAME OVER\nYour score is ' + highscore + '\nPress Z to start again')
    this.gameOverMessage.fill = '#ffffff'
    this.gameOverMessage.anchor.set(0.5, 0.5)
    this.gameOverMessage.font = 'Candal'
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      changeState('level1')
      highscore = 0
    }
  }
}
