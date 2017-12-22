var demo = {
  Prefabs: {}
}
WebFontConfig = {
  google: { families: [ 'Candal' ] }
}
demo.menu = function () {
  this.ready = false
}
demo.menu.prototype = {
  preload: function () {
    this.load.onLoadComplete.addOnce(this.onLoadComplete, this)
    game.load.spritesheet('ship', './assets/sprites/ship.png', 85, 62)
    game.load.spritesheet('vhs', './assets/sprites/vhs.png', 70, 100)
    game.load.spritesheet('bullet', './assets/sprites/bullet.png', 64, 22)
    game.load.spritesheet('boomEffect', './assets/effects/explosion.png', 80, 80)
    game.load.spritesheet('windows', './assets/sprites/windows.png', 186, 94)
    game.load.spritesheet('boomEffect', './assets/effects/explosion.png', 80, 80)
    game.load.spritesheet('rain', 'assets/effects/rain.png', 17, 17)
    game.load.spritesheet('boss', 'assets/sprites/boss.png', 174, 359)
    game.load.spritesheet('bossFire', 'assets/sprites/bossFire.png', 84, 84)
    game.load.spritesheet('spray', 'assets/sprites/spray.png', 120, 120)
    game.load.spritesheet('railgun', 'assets/sprites/railgun.png', 800, 32)
    game.load.image('bg', './assets/backgrounds/space.png')
    game.load.image('star', './assets/sprites/star.png')
    game.load.image('guts', 'assets/textures/guts.png')
    game.load.image('smile', 'assets/textures/smile.png')
    game.load.audio('shootSound', 'assets/sounds/shoot.wav')
    game.load.audio('deadSound', 'assets/sounds/dark-shoot.wav')
    game.load.audio('bgm1', 'assets/bgm/Sycamore_Drive_-_05_-_Slumber.mp3')
    game.load.audio('bgm2', 'assets/bgm/Sycamore_Drive_-_04_-_Ocean_Breeze.mp3')
    game.load.audio('bgm3', 'assets/bgm/Sycamore_Drive_-_03_-_The_Waves_Call_Her_Name.mp3')
    game.load.audio('bgm4', 'assets/bgm/Sycamore_Drive_-_02_-_Happiness.mp3')
    game.load.image('sky', 'assets/backgrounds/underwater3.png')
    game.load.image('title', 'assets/backgrounds/title.png')
    game.load.image('end', 'assets/backgrounds/ending.jpg')
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.5.18/webfont.js')
  },

  onLoadComplete: function(){
		this.ready = true
	},

  create: function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    game.add.sprite(0, 0, 'title')
    if (this.ready) {
      this.startMessage = game.add.text(game.world.centerX, game.world.centerY + 150,
        'Press Z to start', {fontSize: 25 + 'px', font: 'Candal'})
    }
    this.startMessage.fill = '#ffffff'
    this.startMessage.anchor.set(0.5, 0.5)
  },

  update: function () {
    startFromBeginning()
  }
}

function startFromBeginning () {
  if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
    game.state.start('level1')
  }
}

