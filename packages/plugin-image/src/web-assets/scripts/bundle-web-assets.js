const fs = require('fs');
const join = require('path').join;
const {intermediatesPath, getJsAssetDistPath} = require('./build-path-helpers');

function generateRceWebAdapterHtml() {
  const jsfile = fs.readFileSync(join(intermediatesPath, 'bundled-plugin-image.js'));
  const script = `${jsfile}`;
  const js = `module.exports  = {
    scriptString: ${JSON.stringify(script)}
  } `;
  fs.writeFileSync(getJsAssetDistPath(), js);
}

generateRceWebAdapterHtml();
