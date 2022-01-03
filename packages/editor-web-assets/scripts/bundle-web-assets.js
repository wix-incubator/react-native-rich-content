const fs = require('fs');
const join = require('path').join;
const {intermediatesPath, getHtmlAssetDistPath, getJsAssetDistPath} = require('./build-path-helpers');
const resourcesSrcPath = join(__dirname, '..', 'src', 'resources');

function generateRceWebAdapterHtml() {
  const jsfile = fs.readFileSync(join(intermediatesPath, 'bundled-rce-web.js'));
  const editorStyles = fs.readFileSync(join(resourcesSrcPath, 'editor-styles.html'));

  const html = `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
      <meta charset="utf-8" />
    </head>

    <body style="margin: 20px 0 20px 0;">
      ${editorStyles}
      <div id="root" style="min-height:80px;"></div>
      <script>
      ${jsfile}
      </script>
    </body>
  </html>
  `;

  fs.writeFileSync(getHtmlAssetDistPath(), html);
  const js = `module.exports  = {
    html: ${JSON.stringify(html)}
  } `;
  fs.writeFileSync(getJsAssetDistPath(), js);
}

generateRceWebAdapterHtml();
