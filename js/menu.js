var demo = {}
WebFontConfig = {
  google: { families: [ 'Candal' ] }
}
demo.menu = function () {}
demo.menu.prototype = {
  preload: function () {
    game.load.withSyncPoint(this.loadFonts, this)
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
  },

  loadFonts: function (loader) {
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js')
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
