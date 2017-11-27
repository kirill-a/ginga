demo.end = function () {}
demo.end.prototype = {
  preload: function () {},
  create: function () {
    game.stage.backgroundColor = '#28b463'
    var emitter = game.add.emitter(game.world.centerX, 500, 2000)
    emitter.makeParticles(['star'], 0, 2000, false, true)
    emitter.maxParticleSpeed.set(300, -300)
    emitter.minParticleSpeed.set(-300, -100)
    emitter.gravity = 300
    game.time.events.add(2000, function () {
      emitter.start(false, 5000, 20);
      game.time.events.loop(500, function () {
        if (emitter.on) {
          emitter.on = false
        } else {
          emitter.on = true
        }
      })
    })
    this.endMessage = game.add.text(game.world.centerX, game.world.centerY,
      'Congratulations!\nYour score is ' + highscore + '\nPress Z to start again')
    this.endMessage.fill = '#ffffff'
    this.endMessage.anchor.set(0.5, 0.5)
    this.endMessage.font = 'Candal'
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      highscore = 0
      continueCount = 3
      changeState('level1')
    }
  }
}
