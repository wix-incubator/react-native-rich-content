const fs = require('fs');
const execSync = require('child_process').execSync;
const {intermediatesPath} = require('./build-path-helpers');

execSync(`rm -rf ${intermediatesPath}`);
fs.mkdirSync(intermediatesPath);
