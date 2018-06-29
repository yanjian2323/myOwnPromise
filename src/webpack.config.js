let path = require('path');

module.exports = {
    entry: {
        app: './index.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    }
};