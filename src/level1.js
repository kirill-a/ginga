var enemyGroup, boomEffect, motion, bgm1, ship, star, texture, boom, manager
var xx = [], yy = [], zz = [], numberOfStars = 50, speed = 6, distance = 300

demo.level1 = function () {}
demo.level1.prototype = {
  preload: function () {},
  create: function () {
    manager = new demo.Prefabs.Manager()
    manager.currentLevel = 1
    game.stage.backgroundColor = '#800080'
    game.physics.startSystem(Phaser.Physics.ARCADE)
    bgm1 = game.add.audio('bgm1', 0.4, true)
    bgm1.play()
    game.world.setBounds(0, 0, 800, 600)
    star = game.make.sprite(0, 0, 'star')
    texture = game.add.renderTexture(800, 600, 'texture')

    game.add.sprite(0, 0, texture)
    for (var i = 0; i < numberOfStars; i++) {
      xx[i] = Math.floor(Math.random() * 800) - 400
      yy[i] = Math.floor(Math.random() * 600) - 300
      zz[i] = Math.floor(Math.random() * 1700) - 100
    }
    ship = new demo.Prefabs.Ship(game, game.world.centerX / 2, game.world.centerY)
		game.add.existing(ship);

    enemyGroup = game.add.group()
    enemyGroup.enableBody = true
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE
    game.time.events.loop(4000, this.makeEnemies, this)
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
    game.physics.arcade.overlap(enemyGroup, ship.bullets, ship.hitGroup)
    if (manager.highscore > 3000) {
      bgm1.stop()
      ship.kill()
      enemyGroup.kill()
      game.state.start('level2')
    }
    game.physics.arcade.overlap(enemyGroup, ship, this.gameOver)
    enemyGroup.forEach(this.rotateEnemy)
  },

  makeEnemies: function () {
    for (var i = 0; i < 4; i++) {
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

  rotateEnemy: function (it) {
    it.animations.play('dim', 14, true)
    it.rotation += 0.05
  },

  gameOver: function (e, s) {
    ship.gameOver(e, s, bgm1)
  }
}