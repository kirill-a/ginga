var ship, bullet, bullets, enemyGroup, cursors, shootSound, filter, sprite, boomEffect, deadSound, theme, motion, highscore = 0, theme1playing = false, theme2playing = false;
var bulletvelocity = 700, nextFire = 0, fireRate = 300
var speed = 6
var centerX = 800 / 2
var centerY = 600 / 2
var distance = 300
var speed = 6
var theme2

demo.level2 = function () {}
demo.level2.prototype = {
  preload: function () {
    game.load.spritesheet('ship', './assets/sprites/ship.png', 85, 65)
    game.load.spritesheet('windows', './assets/sprites/windows.png', 200, 100)
    game.load.spritesheet('bullet', './assets/sprites/bullet.png', 64, 22)
    game.load.spritesheet('boomEffect', './assets/effects/explosion.png', 80, 80)
    game.load.image('sky', 'assets/backgrounds/underwater3.png');
	game.load.spritesheet('rain', 'assets/effects/rain.png', 17, 17);
    game.load.image('star', './assets/sprites/star.png')
    game.load.audio('shootSound', 'assets/sounds/shoot.wav')
    game.load.audio('deadSound', 'assets/sounds/dark-shoot.wav')
    game.load.audio('theme2', 'assets/bgm/Sycamore_Drive_-_04_-_Ocean_Breeze.mp3')
  },
  create: function () {
    game.stage.backgroundColor = '#000000'
    game.physics.startSystem(Phaser.Physics.ARCADE)

    theme2 = game.add.audio('theme2', 0.3, true)
    if (!theme2playing) {
      theme.stop()
      theme2.play()
      theme2playing = true
    }
    shootSound = game.add.audio('shootSound')
    shootSound.addMarker('shoot', 0, 2)
    deadSound = game.add.audio('deadSound')
    deadSound.addMarker('dead', 0, 2)
    game.world.setBounds(0, 0, 800, 600)

	game.add.image(0, 0, 'sky');

	var emitter = game.add.emitter(game.world.centerX, 0, 400);

	emitter.width = game.world.width;
	// emitter.angle = 30; // uncomment to set an angle for the rain.

	emitter.makeParticles('rain');
	emitter.minParticleScale = 0.1;
	emitter.maxParticleScale = 0.5;
	emitter.setYSpeed(300, 500);
	emitter.setXSpeed(-5, 5);
	emitter.minRotation = 0;
	emitter.maxRotation = 0;

	emitter.start(false, 1600, 5, 0);
    
    bullets = game.add.group()
    bullets.enableBody = true
    bullets.physicsBodyType = Phaser.Physics.ARCADE
    bullets.createMultiple(50, 'bullet')
    bullets.setAll('checkWorldBounds', true)
    bullets.setAll('outOfBoundsKill', true)
    bullets.setAll('anchor.y', 0.5)
    bullets.setAll('scale.x', 0.6)
    bullets.setAll('scale.y', 0.6)
    ship = game.add.sprite(centerX / 2, centerY, 'ship')
    ship.anchor.setTo(0.5, 0.5)
    // ship.scale.setTo(1.5, 1.5);

    game.physics.enable(ship)
    ship.body.collideWorldBounds = true
    ship.body.gravity.x = -1000
    ship.body.bounce.x = 0.3
    ship.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
    cursors = game.input.keyboard.createCursorKeys()
    enemyGroup = game.add.group()
    enemyGroup.enableBody = true
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE
    game.time.events.loop(2000, this.makeEnemies, this)
  },

  makeEnemies: function () {
    for (var i = 0; i < 5; i++) {
      enemyGroup.create(200 * Math.random() * 5 + 100, 0, 'windows')
    }
    enemyGroup.forEach(this.moveEnemy)
    enemyGroup.setAll('anchor.y', 0.5)
    enemyGroup.setAll('anchor.x', 0.5)
    enemyGroup.setAll('scale.x', 0.5)
    enemyGroup.setAll('scale.y', 0.5)
  },

  moveEnemy: function (it) {
      game.add.tween(it).to({y: 700}, 3500, 'Linear', true, 0, -1, true)
  },

  update: function () {
    ship.animations.play('fly', 30, true)
    if (cursors.left.isDown) {
      ship.body.velocity.x = -400
    } else if (cursors.right.isDown) {
      ship.body.velocity.x = 400
    } else { ship.body.velocity.x = 0 }
    if (cursors.up.isDown) {
      ship.body.velocity.y = -300
    } else if (cursors.down.isDown) {
      ship.body.velocity.y = 300
    } else { ship.body.velocity.y = 0 }
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      this.fire()
    }
    game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup)
    game.physics.arcade.overlap(enemyGroup, ship, this.gameOver)

    enemyGroup.forEach(this.rotateEnemy)
  },

  fire: function () {
    if (game.time.now > nextFire) {
      nextFire = game.time.now + fireRate
      bullet = bullets.getFirstDead()
      bullet.reset(ship.x, ship.y)
      bullet.animations.add('shoot', [0, 1, 2, 3, 4, 5, 6])
      bullet.animations.play('shoot', 14, true)
      bullet.body.velocity.x = 500
      bullet.anchor.setTo(0.4, 0.4)
      shootSound.play('shoot')
    }
  },

  rotateEnemy: function (it) {
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

function changeState (stateName) {
  game.state.start(stateName)
};
