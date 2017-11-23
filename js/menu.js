var demo = {}
WebFontConfig = {
  google: { families: [ 'Candal' ] }
}
demo.menu = function () {}
demo.menu.prototype = {
  preload: function () {
    game.load.script('webfont', 'js/webfont.js')
    game.load.image('title', './assets/backgrounds/title.png')
  },
  create: function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.add.sprite(0, 0, 'title')
    this.startMessage = game.add.text(game.world.centerX, game.world.centerY + 150,
      'Press Z to start', {fontSize: 25 + 'px', font: 'Candal'})
    this.startMessage.fill = '#ffffff'
    this.startMessage.anchor.set(0.5, 0.5)
  },
  update: function () {
    startFromBeginning()
  }
}

function startFromBeginning () {
  if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
    changeState('level1')
  }
}

function changeState (stateName) {
  game.state.start(stateName)
}
