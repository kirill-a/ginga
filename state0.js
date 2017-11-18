var demo = {};
var wolf;
var speed = 6;
var centerX = 1500/2;
var centerY = 1000/2;
demo.state0 = function() {};

demo.state0.prototype = {
  preload: function() {
    game.load.spritesheet('wolf', './assets/spritesheets/wolf_sheet.png', 250, 420);
    game.load.image('bg', './assets/backgrounds/back.png');
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    console.log('state0')
    addChangeStateEventListeners();
    
    game.world.setBounds(0, 0, 2813, 1000)
    
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var bg = game.add.sprite(0, 0, 'bg');
    
    wolf = game.add.sprite(centerX, centerY, 'wolf');
    wolf.anchor.setTo(0.5, 0.5);
    wolf.scale.setTo(0.7, 0.7)

    game.physics.enable(wolf);
    wolf.body.collideWorldBounds = true;
    
    wolf.animations.add('walk', [0, 1, 2, 3]);
    
    game.camera.follow(wolf);
    game.camera.deadzone = new Phaser.Rectangle(centerX - 300, 0, 600, 1000);
  },
  update: function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      wolf.scale.setTo(0.7, 0.7)
      wolf.x += speed;
      wolf.animations.play('walk', 14, true);
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      wolf.scale.setTo(-0.7, 0.7)
      wolf.x -= speed;
      wolf.animations.play('walk', 14, true);
    }
    else {
      wolf.animations.stop('walk');
      wolf.frame = 0;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      wolf.y -= speed;
      if (wolf.y < 572) {
        wolf.y = 572;
      }
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      wolf.y += speed;
    }
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