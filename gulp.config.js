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
        ]}
    }

    return config
}