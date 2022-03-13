const { createWebAssetsBuildTools } = require('@react-native-rich-content/web-assets-build-tools');
const { resolve } = require('path');

const buildTools = createWebAssetsBuildTools({
  isDevMode: true,
  intermediatesPath: resolve('./intermediates'),
  distPath: resolve('./dist/wix-image-plugin-script.js'),
  filename: 'bundled-plugin-image.js',
  library: 'WIX_IMAGE_PLUGIN',
  entry: resolve('./src/create-plugin.ts'),
});

module.exports = buildTools;
