var enemyGroup, enemySprays, bgm3, timer, ship, bg

demo.level3 = function () {}
demo.level3.prototype = {
  preload: function () {},
  create: function () {
    manager.currentLevel = 3
    bgm3 = game.add.audio('bgm3', 0.4, true)
    bgm3.play()
    bg = game.add.tileSprite(0, 0, 800, 600, 'smile');
    ship = new demo.Prefabs.Ship(game, game.world.centerX / 2, game.world.centerY)
    game.add.existing(ship)
    enemyGroup = game.add.group()
    enemySprays = game.add.group()
    enemySprays.enableBody = true
    enemySprays.physicsBodyType = Phaser.Physics.ARCADE
    game.time.events.loop(2100, this.makeEnemySprays, this)
    enemyGroup.enableBody = true
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE
    game.time.events.loop(1100, this.makeEnemies, this)
    timer = game.time.create(false)
    timer.add(100000, this.changeState, this)
    timer.start()
  },

  update: function () {
    bg.tilePosition.x -= 2
    enemyGroup.forEach(this.killEnemy)
    enemySprays.forEach(this.killEnemy)
    game.physics.arcade.collide(enemyGroup, enemySprays)
    game.physics.arcade.overlap(enemyGroup, ship, this.gameOver)
    game.physics.arcade.overlap(enemySprays, ship, this.gameOver)
    game.physics.arcade.overlap(enemySprays, ship.bullets, ship.hitGroup)
    game.physics.arcade.overlap(enemyGroup, ship.bullets, this.slowdown)
    enemySprays.forEach(this.rotateEnemy)
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      bg.tilePosition.y += 2
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      bg.tilePosition.y -= 2
    }
  },

  render: function() {
    game.debug.text(timer.duration, 32, 32)
  },

  changeState: function () {
    bgm3.stop()
    ship.kill()
    enemyGroup.kill()
    enemySprays.kill()
    game.state.start('level4')
  },

  killEnemy: function(it) {
    if (it.body.x + 800 < game.camera.x || it.body.y > game.camera.y + 600) {
      it.kill()
    }
  },

  makeEnemies: function () {
    for (var i = 0; i < 1; i++) {
      enemyGroup.create(1300, 600 * Math.random(), 'railgun')
    }
    enemyGroup.forEach(this.moveEnemy)
    enemyGroup.setAll('anchor.y', 0.5)
    enemyGroup.setAll('anchor.x', 0.5)
    enemyGroup.setAll('body.immovable', true)
  },

  makeEnemySprays: function () {
    for (var i = 0; i < 1; i++) {
      enemySprays.create(800 * Math.random(), -200, 'spray')
    }
    enemySprays.forEach(this.moveSpray)
    enemySprays.setAll('anchor.y', 0.5)
    enemySprays.setAll('anchor.x', 0.5)
    enemySprays.setAll('scale.x', 0.5)
    enemySprays.setAll('scale.y', 0.5)
  },

  moveEnemy: function (it) {
    it.body.velocity.x = -550
  },

  slowdown: function (e) {
    e.body.velocity.x += 50
  },

  moveSpray: function (it) {
    it.animations.add('dim', [0, 1, 2, 3, 4, 5, 6, 7, 8])
    it.body.bounce.y = 0.5
  },

  rotateEnemy: function (it) {
    it.body.gravity.y = 200
    it.rotation += 0.05
    it.animations.play('dim', 18, true)
  },

  gameOver: function (e, s) {
    ship.gameOver(e, s, bgm3)
  }
}