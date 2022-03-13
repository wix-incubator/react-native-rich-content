const fs = require('fs');
const { execSync } = require('child_process');

export const generateIntermediatesDirectory = (intermediatesPath: string) => {
  execSync(`rm -rf ${intermediatesPath}`);
  fs.mkdirSync(intermediatesPath);
};
