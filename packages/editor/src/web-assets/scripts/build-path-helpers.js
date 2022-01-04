const join = require('path').join;

const intermediatesPath = join(__dirname, '../src/intermediates');
const distPath = join(__dirname, '..', 'src', 'dist');
const getHtmlAssetDistPath = () => join(distPath, `rce-web.html`);
const getJsAssetDistPath = () => join(distPath, `rce-web.js`);

module.exports = {
  intermediatesPath,
  distPath,
  getHtmlAssetDistPath,
  getJsAssetDistPath,
};
