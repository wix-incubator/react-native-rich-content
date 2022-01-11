const fs = require('fs');
const execSync = require('child_process').execSync;
const {intermediatesPath, distPath} = require('./build-path-helpers');

removeDist();
execSync(`rm -rf ${intermediatesPath}`);
fs.mkdirSync(intermediatesPath);
fs.mkdirSync(distPath);

function removeDist() {
  if (fs.existsSync(distPath)) {
    fs.rmdirSync(distPath, {recursive: true})
  }
}
