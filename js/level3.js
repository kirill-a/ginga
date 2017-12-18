var enemyGroup, enemySprays, boomEffect, bgm4, filter, sprite, bullet, bullets, timer
var nextFire = 0

demo.level3 = function () {}
demo.level3.prototype = {
  preload: function () {},
  create: function () {
    currentLevel = 3
    bgm4 = game.add.audio('bgm4', 0.4, true)
    bgm4.play()
    //  Shader by GhettoWolf (https://www.shadertoy.com/view/Xdl3WH)

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "#define PI 3.1416",

        "void main( void ) {",

            "//map the xy pixel co-ordinates to be between -1.0 to +1.0 on x and y axes",
            "//and alter the x value according to the aspect ratio so it isn't 'stretched'",

            "vec2 p = (2.0 * gl_FragCoord.xy / resolution.xy - 1.0) * vec2(resolution.x / resolution.y, 1.0);",

            "//now, this is the usual part that uses the formula for texture mapping a ray-",
            "//traced cylinder using the vector p that describes the position of the pixel",
            "//from the centre.",

            "vec2 uv = vec2(atan(p.y, p.x) * 1.0/PI, 1.0 / sqrt(dot(p, p))) * vec2(2.0, 1.0);",

            "//now this just 'warps' the texture read by altering the u coordinate depending on",
            "//the val of the v coordinate and the current time",

            "uv.x += sin(2.0 * uv.y + time * 0.5);",

            "//this divison makes the color value 'darker' into the distance, otherwise",
            "//everything will be a uniform brightness and no sense of depth will be present.",

            "vec3 c = texture2D(iChannel0, uv).xyz / (uv.y * 0.5 + 1.0);",

            "gl_FragColor = vec4(c, 1.0);",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    sprite = game.add.sprite(0, 0, 'smile')
    sprite.width = 800
    sprite.height = 600

    var customUniforms = {
        iChannel0: { type: 'sampler2D', value: sprite.texture, textureData: { repeat: true } }
    };

    filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
    filter.setResolution(800, 600)
    sprite.filters = [ filter ]
    ship = new demo.Prefabs.Ship(game, game.world.centerX / 2, game.world.centerY)
    game.add.existing(ship)
    cursors = game.input.keyboard.createCursorKeys()
    enemyGroup = game.add.group()
    enemySprays = game.add.group()
    enemySprays.enableBody = true
    enemySprays.physicsBodyType = Phaser.Physics.ARCADE
    bullets = game.add.group()
    shootBullets(bullets)
    game.time.events.loop(2100, this.makeEnemySprays, this)
    enemyGroup.enableBody = true
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE
    game.time.events.loop(1100, this.makeEnemies, this)
    timer = game.time.create(false)
    timer.add(100000, this.changeState, this)
    timer.start()
  },

  update: function () {
    filter.update()
    game.physics.arcade.collide(enemyGroup, enemySprays)
    game.physics.arcade.overlap(enemyGroup, ship, this.gameOver)
    game.physics.arcade.overlap(enemySprays, ship, this.gameOver)
    game.physics.arcade.overlap(enemySprays, bullets, hitGroup)
    game.physics.arcade.overlap(enemyGroup, bullets, this.slowdown)
    enemySprays.forEach(this.rotateEnemy)
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      this.fire()
    }
  },

  render: function() {
    game.debug.text(timer.duration, 32, 32);
  },

  changeState: function () {
    bgm4.stop()
    ship.kill()
    enemyGroup.kill()
    enemySprays.kill()
    changeState('level4')
  },

  makeEnemies: function () {
    for (var i = 0; i < 1; i++) {
      enemyGroup.create(1600, 600 * Math.random(), 'railgun')
    }
    enemyGroup.forEach(this.moveEnemy)
    enemyGroup.setAll('anchor.y', 0.5)
    enemyGroup.setAll('anchor.x', 0.5)
    enemyGroup.setAll('body.immovable', true);
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
    boomEffect = game.add.sprite(ship.x, ship.y - 35, 'boomEffect')
    boom = boomEffect.animations.add('boomEffect', [0, 1, 2, 3, 4, 5])
    boom.killOnComplete = true
    boomEffect.animations.play('boomEffect', 14, false)
    deadSound.play('dead')
    bgm4.stop()
    e.kill()
    s.kill()
    changeState('gameOver')
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
}
