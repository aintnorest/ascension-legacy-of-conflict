require('@babel/register')({
    presets: ['@babel/preset-env'],
    ignore: [/node_modules/],
    extensions: ['.js']
});

require('./generate-docs.js');
