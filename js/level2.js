var ship, bullet, bullets, enemyGroup, boomEffect
var nextFire = 0

demo.level2 = function () {}
demo.level2.prototype = {
  preload: function () {
    game.load.spritesheet('windows', './assets/sprites/windows.png', 186, 94)
    game.load.spritesheet('boomEffect', './assets/effects/explosion.png', 80, 80)
    game.load.image('sky', 'assets/backgrounds/underwater3.png')
    game.load.spritesheet('rain', 'assets/effects/rain.png', 17, 17)
    game.load.audio('bgm2', 'assets/bgm/Sycamore_Drive_-_04_-_Ocean_Breeze.mp3')
  },
  create: function () {
    bgm2 = game.add.audio('bgm2', 0.4, true)
    bgm2.play()

    game.add.image(0, 0, 'sky')
    var emitter = game.add.emitter(game.world.centerX, 0, 400)
    emitter.width = game.world.width
    emitter.makeParticles('rain')
    emitter.minParticleScale = 0.1
    emitter.maxParticleScale = 0.5
    emitter.setYSpeed(300, 500)
    emitter.setXSpeed(-5, 5)
    emitter.minRotation = 0
    emitter.maxRotation = 0
    emitter.start(false, 1600, 5, 0)
    bullets = game.add.group()
    shootBullets(bullets)
    ship = game.add.sprite(game.world.centerX / 2, game.world.centerY, 'ship')
    ship.anchor.setTo(0.5, 0.5)

    game.physics.enable(ship)
    ship.body.collideWorldBounds = true
    ship.body.gravity.x = -1000
    ship.body.bounce.x = 0.3
    ship.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    cursors = game.input.keyboard.createCursorKeys()
    enemyGroup = game.add.group()
    enemyGroup.enableBody = true
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE
    game.time.events.loop(1100, this.makeEnemies, this)
  },

  makeEnemies: function () {
    for (var i = 0; i < 4; i++) {
      enemyGroup.create(Math.random() * 800, 0, 'windows')
    }
    enemyGroup.forEach(this.moveEnemy)
    enemyGroup.setAll('anchor.y', 0.5)
    enemyGroup.setAll('anchor.x', 0.5)
    enemyGroup.setAll('scale.x', 0.3)
    enemyGroup.setAll('scale.y', 0.3)
  },

  moveEnemy: function (it) {
    it.body.gravity.y = 500
    it.body.collideWorldBounds = true
    it.body.bounce.y = 0.3
    it.body.drag = 200
    game.physics.enable(it)
  },

  update: function () {
    ship.animations.play('fly', 30, true)
    movementShip(ship)
    game.physics.arcade.collide(enemyGroup)
    game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup)
    game.physics.arcade.overlap(enemyGroup, ship, this.gameOver)
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      this.fire()
    }
  },

  fire: function () {
    if (game.time.now > nextFire) {
      nextFire = game.time.now + 300
      bullet = bullets.getFirstDead()
      bullet.reset(ship.x, ship.y)
      bullet.animations.add('shoot', [0, 1, 2, 3, 4, 5, 6])
      bullet.animations.play('shoot', 14, true)
      bullet.body.velocity.x = 500
      bullet.anchor.setTo(0.4, 0.4)
      shootSound.play('shoot')
    }
  },

  gameOver: function (e) {
    boomEffect = game.add.sprite(ship.x, ship.y - 35, 'boomEffect')
    ship.kill()
    e.kill()
    boom = boomEffect.animations.add('boomEffect', [0, 1, 2, 3, 4, 5])
    boom.killOnComplete = true
    boomEffect.animations.play('boomEffect', 14, false)
    deadSound.play('dead')
    bgm2.stop()
    changeState('gameOver')
  },

  hitGroup: function (e) {
    boomEffect = game.add.sprite(e.x, e.y - 35, 'boomEffect')
    bullet.kill()
    e.kill()
    boom = boomEffect.animations.add('boomEffect', [0, 1, 2, 3, 4, 5])
    boom.killOnComplete = true
    boomEffect.animations.play('boomEffect', 14, false)
    deadSound.play('dead')
    highscore = highscore + 100
  }
}
