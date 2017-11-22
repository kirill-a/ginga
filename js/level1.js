var ship, bullet, bullets, enemyGroup, cursors, shootSound, boomEffect, deadSound, motion
var nextFire = 0, highscore = 0
var speed = 6
var distance = 300
var star, texture
var numberOfStars = 50
var xx = [], yy = [], zz = []

demo.level1 = function () {}
demo.level1.prototype = {
  preload: function () {
    game.load.spritesheet('ship', './assets/sprites/ship.png', 85, 62)
    game.load.spritesheet('vhs', './assets/sprites/vhs.png', 70, 100)
    game.load.spritesheet('bullet', './assets/sprites/bullet.png', 64, 22)
    game.load.spritesheet('boomEffect', './assets/effects/explosion.png', 80, 80)
    game.load.image('bg', './assets/backgrounds/space.png')
    game.load.image('star', './assets/sprites/star.png')
    game.load.audio('shootSound', 'assets/sounds/shoot.wav')
    game.load.audio('deadSound', 'assets/sounds/dark-shoot.wav')
    game.load.audio('bgm1', 'assets/bgm/Sycamore_Drive_-_05_-_Slumber.mp3')
  },
  create: function () {
    game.stage.backgroundColor = '#800080'
    game.physics.startSystem(Phaser.Physics.ARCADE)
    bgm1 = game.add.audio('bgm1', 0.4, true)
    bgm1.play()
    shootSound = game.add.audio('shootSound')
    shootSound.addMarker('shoot', 0, 2)
    deadSound = game.add.audio('deadSound')
    deadSound.addMarker('dead', 0, 2)
    game.world.setBounds(0, 0, 800, 600)

    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    star = game.make.sprite(0, 0, 'star')
    texture = game.add.renderTexture(800, 600, 'texture')

    game.add.sprite(0, 0, texture)
    for (var i = 0; i < numberOfStars; i++) {
      xx[i] = Math.floor(Math.random() * 800) - 400
      yy[i] = Math.floor(Math.random() * 600) - 300
      zz[i] = Math.floor(Math.random() * 1700) - 100
    }
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
    game.time.events.loop(5000, this.makeEnemies, this)
  },

  makeEnemies: function () {
    for (var i = 0; i < 5; i++) {
      enemyGroup.create(700, 150 * i + 100, 'vhs')
    }
    motion = Math.random()
    enemyGroup.forEach(this.moveEnemy)
    enemyGroup.setAll('anchor.y', 0.5)
    enemyGroup.setAll('anchor.x', 0.5)
    enemyGroup.setAll('scale.x', 0.7)
    enemyGroup.setAll('scale.y', 0.7)
  },

  moveEnemy: function (it) {
    it.animations.add('dim', [0, 1, 2, 3])
    if (motion > 0.5) {
      game.add.tween(it).to({x: 50}, 2000, 'Elastic.easeIn', true, 0, -1, true)
    } else {
      game.add.tween(it).to({x: ship.x, y: ship.y}, 1500, 'Linear', true, 0, -1, true)
    }
  },

  update: function () {
    texture.clear()
    for (var i = 0; i < numberOfStars; i++) {
      var perspective = distance / (distance - zz[i])
      var x = game.world.centerX + xx[i] * perspective
      var y = game.world.centerY + yy[i] * perspective
      zz[i] += speed
      if (zz[i] > 300) {
        zz[i] -= 600
      }
      texture.renderXY(star, x, y)
    }

    ship.animations.play('fly', 30, true)
    movementShip(ship)
    game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup)
    game.physics.arcade.overlap(enemyGroup, ship, this.gameOver)
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      this.fire()
    }
    enemyGroup.forEach(this.rotateEnemy)
  },

  fire: function () {
    if (game.time.now > nextFire) {
      nextFire = game.time.now + 300
      bullet = bullets.getFirstDead()
      bullet.reset(ship.x, ship.y)
      bullet.animations.add('shoot', [0, 1, 2, 3, 4, 5, 6])
      bullet.animations.play('shoot', 14, true)
      bullet.body.velocity.x = 500
      bullet.anchor.setTo(0.5, 0.5)
      shootSound.play('shoot')
    }
  },

  rotateEnemy: function (it) {
    it.animations.play('dim', 14, true)
    it.rotation += 0.05
  },

  gameOver: function (e) {
    boomEffect = game.add.sprite(ship.x, ship.y - 35, 'boomEffect')
    ship.kill()
    e.kill()
    boom = boomEffect.animations.add('boomEffect', [0, 1, 2, 3, 4, 5])
    boom.killOnComplete = true
    boomEffect.animations.play('boomEffect', 14, false)
    deadSound.play('dead')
    bgm1.stop()
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
    if (highscore > 5000) {
      bgm1.stop()
      changeState('level2')
    }
  }
}

function movementShip(ship) {
  if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.H)) {
    ship.body.velocity.x = -400
  } else if (cursors.right.isDown  || game.input.keyboard.isDown(Phaser.Keyboard.L)) {
    ship.body.velocity.x = 400
  } else { ship.body.velocity.x = 0 }
  if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.K)) {
    ship.body.velocity.y = -300
  } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.J)) {
    ship.body.velocity.y = 300
  } else { ship.body.velocity.y = 0 }
}

function shootBullets(bullets) {
  bullets.enableBody = true
  bullets.physicsBodyType = Phaser.Physics.ARCADE
  bullets.createMultiple(50, 'bullet')
  bullets.setAll('checkWorldBounds', true)
  bullets.setAll('outOfBoundsKill', true)
  bullets.setAll('anchor.y', 0.5)
  bullets.setAll('scale.x', 0.6)
  bullets.setAll('scale.y', 0.6)
}
