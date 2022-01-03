const assets = {
    html: require('./dist/rce-web.html'),
    js: require('./dist/rce-web.js'),
};

export function getHtmlAsset() {
    return assets.html;
}

export function getJsAsset() {
    return assets.js;
}