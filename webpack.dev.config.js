const path = require('path');

const phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')

module.exports = {
    entry: './src/public/app.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
            { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
            { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
            { test: /p2\.js/, use: ['expose-loader?p2'] }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        modules: [path.resolve('node_modules')],
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    },
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist/public')
    }
};