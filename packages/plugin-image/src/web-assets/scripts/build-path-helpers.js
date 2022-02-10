const join = require('path').join;

const intermediatesPath = join(__dirname, '../intermediates');
const distPath = join(__dirname, '..', 'dist');
const getJsAssetDistPath = () => join(distPath, `wix-image-plugin-script.js`);

module.exports = {
  intermediatesPath,
  distPath,
  getJsAssetDistPath,
};
