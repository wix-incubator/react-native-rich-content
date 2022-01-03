const fs = require('fs');
const execSync = require('child_process').execSync;
const {intermediatesPath, getHtmlAssetDistPath, getJsAssetDistPath} = require('./build-path-helpers');

removeDistFiles();
execSync(`rm -rf ${intermediatesPath}`);
fs.mkdirSync(intermediatesPath);

function removeDistFiles() {
  const htmlAssetPath = getHtmlAssetDistPath();
  const jsAssetPath = getJsAssetDistPath();

  if (fs.existsSync(htmlAssetPath) && fs.existsSync(jsAssetPath)) {
    execSync(`rm ${htmlAssetPath}`);
    execSync(`rm ${jsAssetPath}`);
  }
}
