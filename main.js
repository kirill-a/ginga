var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('level1', demo.level1);
game.state.add('gameOver', demo.gameOver);
game.state.start('level1');