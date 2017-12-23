demo.Prefabs.Ship = function(game, x, y) {
  Phaser.Sprite.call(this, game, x, y, 'ship')
  this.anchor.setTo(0.5, 0.5)
  this.game.physics.enable(this, Phaser.Physics.ARCADE)
  this.enableBody = true
  this.body.collideWorldBounds = true
  this.body.gravity.x = -1000
  this.body.bounce.x = 0.3
  this.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
  this.cursors = game.input.keyboard.createCursorKeys()
  this.nextFire = 0
  this.bullets = game.add.group()
  this.bullets.enableBody = true
  this.bullets.physicsBodyType = Phaser.Physics.ARCADE
  this.bullets.createMultiple(50, 'bullet')
  this.bullets.setAll('checkWorldBounds', true)
  this.bullets.setAll('outOfBoundsKill', true)
  this.bullets.setAll('anchor.y', 0.5)
  this.bullets.setAll('scale.x', 0.6)
  this.bullets.setAll('scale.y', 0.6)
  this.shootSound = game.add.audio('shootSound')
  this.shootSound.addMarker('shoot', 0, 2)
  this.deadSound = game.add.audio('deadSound')
  this.deadSound.addMarker('dead', 0, 2)
}

demo.Prefabs.Ship.prototype = Object.create(Phaser.Sprite.prototype)
demo.Prefabs.Ship.constructor = demo.Prefabs.Ship

demo.Prefabs.Ship.prototype.update = function() {
  this.animations.play('fly', 30, true)
  if (this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.H)) {
    this.body.velocity.x = -400
  } else if (this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.L)) {
    this.body.velocity.x = 400
  } else { this.body.velocity.x = 0 }
  if (this.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.K)) {
    this.body.velocity.y = -300
  } else if (this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.J)) {
    this.body.velocity.y = 300
  } else { this.body.velocity.y = 0 }
  if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
    this.fire()
  }
}

demo.Prefabs.Ship.prototype.fire = function() {
  if (game.time.now > this.nextFire) {
    this.nextFire = game.time.now + 300
    var bullet = this.bullets.getFirstDead()
    bullet.reset(this.x, this.y)
    bullet.animations.add('shoot', [0, 1, 2, 3, 4, 5, 6])
    bullet.animations.play('shoot', 14, true)
    bullet.body.velocity.x = 500
    bullet.anchor.setTo(0.5, 0.5)
    this.shootSound.play('shoot')
  }
}

demo.Prefabs.Ship.prototype.hitGroup = function(e, b) {
  b.kill()
  e.kill()
  this.boomEffect = game.add.sprite(e.x, e.y - 35, 'boomEffect')
  this.boom = this.boomEffect.animations.add('boomEffect', [0, 1, 2, 3, 4, 5])
  this.boom.killOnComplete = true
  this.boomEffect.animations.play('boomEffect', 14, false)
  ship.deadSound.play('dead')
  manager.highscore += 100
}