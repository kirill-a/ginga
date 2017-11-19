var demo = {};
var ship, bullet, bullets, enemyGroup, cursors;
var velocity = 700, nextFire = 0, fireRate = 500;
var speed = 6;
var centerX = 800/2;
var centerY = 600/2;

demo.state0 = function() {};
demo.state0.prototype = {
  preload: function() {
    game.load.spritesheet('ship', './assets/sprites/ship.png', 85, 65);
    game.load.spritesheet('vhs', './assets/sprites/vhs.png', 85, 65);
    game.load.spritesheet('bullet', './assets/sprites/bullet.png', 64, 22);
    game.load.image('bg', './assets/backgrounds/space.png');
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    addChangeStateEventListeners();
    
    game.world.setBounds(0, 0, 800, 600);
    
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var bg = game.add.sprite(0, 0, 'bg');
    
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('scale.x', 0.6);
    bullets.setAll('scale.y', 0.6);
    
    ship = game.add.sprite(centerX/2, centerY, 'ship');
    ship.anchor.setTo(0.5, 0.5);
    //ship.scale.setTo(1.5, 1.5);

    game.physics.enable(ship);
    ship.body.collideWorldBounds = true;
    ship.body.gravity.x = -1000;
    ship.body.bounce.x = 0.3;
    ship.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    //bullet.animations.add('shoot', [0, 1, 2, 3, 4, 5, 6]);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    
    for (var i = 0; i < 5; i++) {
      enemyGroup.create(700, 150 * i + 100, 'vhs');
    }

    enemyGroup.setAll('anchor.y', 0.5);
    enemyGroup.setAll('anchor.x', 0.5);
    enemyGroup.setAll('scale.x', 1.4);
    enemyGroup.setAll('scale.y', 1.4);
  },
  update: function(){
    ship.animations.play('fly', 30, true);
    //bullet.animations.play('shoot', 30, true);
    if (cursors.left.isDown) {
      ship.body.velocity.x = -400;
    } else if (cursors.right.isDown) {
//      ship.body.acceleration.x = accel;
      ship.body.velocity.x = 400;
    } else { ship.body.velocity.x = 0;};
    if (cursors.up.isDown){
//      ship.body.acceleration.y = -accel;
      ship.body.velocity.y = -300;
    }
    else if (cursors.down.isDown) {
//      ship.body.acceleration.y = accel;
      ship.body.velocity.y = 300;
    }
    else { ship.body.velocity.y = 0; };
    
    if (game.input.activePointer.isDown) {
      this.fire();
    };

    game.physics.arcade.overlap(enemyGroup, bullets, this.hitGroup);
  },
    
  fire: function() {
    if(game.time.now > nextFire) {
      nextFire = game.time.now + fireRate;
      console.log('firing');
      bullet = bullets.getFirstDead();
      bullet.reset(ship.x, ship.y);

      game.physics.arcade.moveToPointer(bullet, velocity);
      bullet.rotation = game.physics.arcade.angleToPointer(bullet);
    }
  },

  hitGroup: function(e) {
    bullet.kill();
    e.kill();
  }
};

function changeState(key, stateNum) {
  game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {
  game.input.keyboard.addKey(key).onDown.add(fn, null, null, args)
}

function addChangeStateEventListeners() {
  addKeyCallback(Phaser.Keyboard.ZERO,  changeState, 0)
  addKeyCallback(Phaser.Keyboard.ONE,   changeState, 1)
  addKeyCallback(Phaser.Keyboard.TWO,   changeState, 2)
  addKeyCallback(Phaser.Keyboard.THREE, changeState, 3)
  addKeyCallback(Phaser.Keyboard.FOUR,  changeState, 4)
  addKeyCallback(Phaser.Keyboard.FIVE,  changeState, 5)
  addKeyCallback(Phaser.Keyboard.SIX,   changeState, 6)
  addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7)
  addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8)
  addKeyCallback(Phaser.Keyboard.NINE,  changeState, 9)
}