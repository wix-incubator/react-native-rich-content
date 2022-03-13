const fs = require('fs');
const { join } = require('path');

export const generateJavascriptFile = ({ intermediatesPath, filename, distPath }: {
    intermediatesPath: string;
    filename: string;
    distPath: string;
}) => {
  const jsfile = fs.readFileSync(join(intermediatesPath, filename));
  const script = `${jsfile}`;
  const js = `module.exports  = {
    scriptString: ${JSON.stringify(script)}
  } `;
  fs.writeFileSync(distPath, js);
};
