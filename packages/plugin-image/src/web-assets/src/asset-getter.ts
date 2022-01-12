const assets = {
    js: require('./dist/wix-image-plugin-script.js').scriptString,
};

export function getJsScriptStringAsset() {
    return assets.js;
}