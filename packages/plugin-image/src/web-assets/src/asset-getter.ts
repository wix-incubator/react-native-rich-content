const assets = {
    js: require('./wix-image-plugin-script.js').scriptString,
};

export function getJsScriptStringAsset() {
    return assets.js;
}