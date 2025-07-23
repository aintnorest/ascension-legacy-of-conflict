require(`@babel/register`)({
  presets: [`@babel/preset-env`],
});

require(`./generate-docs.js`);
