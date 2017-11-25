var ship, bullet, bullets, enemy, boomEffect, bgm3, filter, sprite
var nextFire = 0, lives = 100

demo.level3 = function () {}
demo.level3.prototype = {
  preload: function () {
    game.load.image('cyberglow', 'assets/textures/cyberglow.png');
    game.load.image('tron', 'assets/textures/tron.png');
    game.load.image('metal', 'assets/textures/metal.png');
    game.load.image('factory', 'assets/textures/factory.png');
    game.load.image('ooze', 'assets/textures/ooze.png');
  },
  create: function () {
    bgm3 = game.add.audio('bgm3', 0.4, true)
    bgm3.play()

        var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "float t = time;",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",
            "vec2 texcoord = gl_FragCoord.xy / vec2(resolution.y);",

            "texcoord.y -= t*0.2;",

            "float zz = 1.0/(1.0-uv.y*1.7);",
            "texcoord.y -= zz * sign(zz);",

            "vec2 maa = texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0) ;",
            "vec2 maa2 = (texcoord.xy * vec2(zz, 1.0) - vec2(zz, 0.0))*0.3 ;",
            "vec4 stone = texture2D(iChannel0, maa);",
            "vec4 blips = texture2D(iChannel0, maa);",
            "vec4 mixer = texture2D(iChannel0, maa2);",

            "float shade = abs(1.0/zz);",

            "vec3 outp = mix(shade*stone.rgb, mix(1.0, shade, abs(sin(t+maa.y-sin(maa.x))))*blips.rgb, min(1.0, pow(mixer.g*2.1, 2.0)));",
            "gl_FragColor = vec4(outp,1.0);",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    sprite = game.add.sprite(0, 0, 'cyberglow');
    sprite.width = 800;
    sprite.height = 600;

    var customUniforms = {
        iChannel0: { type: 'sampler2D', value: sprite.texture, textureData: { repeat: true } }
    };

    filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
    filter.setResolution(800, 600);

    sprite.filters = [ filter ];
    
    
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
    enemy = game.add.sprite(1000, 300, 'boss')
    game.physics.enable(enemy)
    enemy.enableBody = true
    //enemy.body.collideWorldBounds = true
    enemy.body.bounce.y = 0.5
    enemy.body.bounce.x = 0.5
    enemy.anchor.setTo(0.5, 0.5)
    enemy.physicsBodyType = Phaser.Physics.ARCADE
    enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6])
    game.add.tween(enemy).to({x: 50, y: 300}, 15000, 'Linear', true, 0, -1, true)
  },

  update: function () {
    enemy.animations.play('move', 3, true)
    filter.update();
    ship.animations.play('fly', 30, true)
    moveShip(ship)
    game.physics.arcade.collide(enemy)
    game.physics.arcade.overlap(enemy, bullets, this.hitGroup)
    game.physics.arcade.overlap(enemy, ship, this.gameOver)
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
    bgm3.stop()
    changeState('gameOver')
  },

  hitGroup: function (e, b) {
    boomEffect = game.add.sprite(b.x+20, b.y, 'boomEffect')
    b.kill()
    if (lives == 0) {
      e.kill()
    }
    else {
      lives = lives - 1
    }
    
    boom = boomEffect.animations.add('boomEffect', [0, 1, 2, 3, 4, 5])
    boom.killOnComplete = true
    boomEffect.animations.play('boomEffect', 14, false)
    deadSound.play('dead')
    highscore = highscore + 100
  }
}
