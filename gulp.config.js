module.exports = function() {
    var config = {
        alljs: ['./src/**/*.js'],
        build: './build',
        exclude: { globals: [
            'Phaser',
            'demo',
            'game',
            'WebFontConfig',
            'manager'
        ]},
        list: [
            'src/menu.js',
            'src/prefabs/ship.js',
            'src/prefabs/stateManager.js',
            'src/level1.js',
            'src/level2.js',
            'src/level3.js',
            'src/level4.js',
            'src/gameOver.js',
            'src/end.js',
            'src/main.js'
        ],
        pkg: [
            'assets/**/*',
            'phaser/**/*',
            'index.html',
            'main.css'
        ]
    }

    return config
}