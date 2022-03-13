const fs = require('fs');
const { join } = require('path');

export const generateJavascriptFile = ({
  intermediatesPath,
  filename,
  distPath,
  fieldName,
  fileTransformer,
}: {
    intermediatesPath: string;
    filename: string;
    distPath: string;
    fieldName: string;
    fileTransformer?: (file: Buffer) => string;
}) => {
  const jsfile = fs.readFileSync(join(intermediatesPath, filename));
  const script = fileTransformer ? `${fileTransformer(jsfile)}` : `${jsfile}`;
  const js = `module.exports  = {
    ${fieldName}: ${JSON.stringify(script)}
  } `;
  fs.writeFileSync(distPath, js);
};
