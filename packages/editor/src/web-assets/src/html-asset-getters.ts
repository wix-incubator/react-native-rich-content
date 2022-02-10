const assets = {
    html: require('./rce-web.html'),
    js: require('./rce-web.js'),
};

export function getHtmlAsset() {
    return assets.html;
}

export function getJsAsset() {
    return assets.js;
}