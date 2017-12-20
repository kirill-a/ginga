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
}

demo.Prefabs.Ship.prototype = Object.create(Phaser.Sprite.prototype)
demo.Prefabs.Ship.constructor = demo.Prefabs.Ship

demo.Prefabs.Ship.prototype.update = function() {
  this.animations.play('fly', 30, true)
  if (this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.H)) {
    this.body.velocity.x = -400
  } else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.L)) {
    this.body.velocity.x = 400
  } else { this.body.velocity.x = 0 }
  if (this.cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.K)) {
    this.body.velocity.y = -300
  } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.J)) {
    this.body.velocity.y = 300
  } else { this.body.velocity.y = 0 }
}