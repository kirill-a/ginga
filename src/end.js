demo.end = function () {}
demo.end.prototype = {
  preload: function () {},
  create: function () {
    game.add.image(0, 0, 'end')
    var emitter = game.add.emitter(game.world.centerX, 200, 2000)
    emitter.makeParticles(['star'], 0, 2000, false, true)
    emitter.maxParticleSpeed.set(300, -300)
    emitter.minParticleSpeed.set(-300, -100)
    emitter.gravity = 300
    game.time.events.add(2000, function () {
      emitter.start(false, 5000, 20)
      game.time.events.loop(500, function () {
        if (emitter.on) {
          emitter.on = false
        } else {
          emitter.on = true
        }
      })
    })
    this.endMessage = game.add.text(game.world.centerX, game.world.centerY / 2,
      'Congratulations!\nYour score is ' + manager.highscore + '\nPress Z to start again')
    this.endMessage.fill = '#ffffff'
    this.endMessage.anchor.set(0.5, 0.5)
    this.endMessage.font = 'Candal'
  },
  update: function () {
    if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
      manager.highscore = 0
      manager.continueCount = 3
      game.state.start('level1')
    }
  }
}
