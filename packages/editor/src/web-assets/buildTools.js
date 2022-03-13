const { createWebAssetsBuildTools } = require('@react-native-rich-content/web-assets-build-tools');
const { resolve } = require('path');
const fs = require('fs');

function generateHtml(jsFile) {
  const editorStyles = fs.readFileSync(resolve('./src/resources/editor-styles.html'));

  const html = `<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
      <meta charset="utf-8" />
    </head>

    <body style="margin: 20px 0 20px 0;">
      ${editorStyles}
      <div id="root" style="min-height:80px;"></div>
      <script>
      ${jsFile}
      </script>
    </body>
  </html>
  `;

  fs.writeFileSync(resolve('./dist/rce-web.html'), html);
  return html;
}

const buildTools = createWebAssetsBuildTools({
  isDevMode: true,
  intermediatesPath: resolve('./intermediates'),
  distPath: resolve('./dist/rce-web.js'),
  filename: 'bundled-rce-web.js',
  library: 'WebRce',
  entry: resolve('./src/render-editor.tsx'),
  fieldName: 'html',
  fileTransformer: generateHtml,
});

module.exports = buildTools;
