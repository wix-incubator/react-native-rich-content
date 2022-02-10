const join = require('path').join;

const intermediatesPath = join(__dirname, '..', 'intermediates');
const distPath = join(__dirname, '..', 'dist');
const getHtmlAssetDistPath = () => join(distPath, `rce-web.html`);
const getJsAssetDistPath = () => join(distPath, `rce-web.js`);

module.exports = {
  intermediatesPath,
  distPath,
  getHtmlAssetDistPath,
  getJsAssetDistPath,
};
