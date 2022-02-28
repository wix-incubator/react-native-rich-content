import { Image, Platform } from 'react-native';
import { AtomicPlugin } from '@react-native-rich-content/common';
import { getHtmlAsset, getJsAsset, WebEditorProps } from '../web-assets';

// eslint-disable-next-line consistent-return
const getUriOrigin = (uri?: string) => {
  if (uri) {
    const uriOriginMatcher = /(.*:\/\/).*/;
    const match = uri.match(uriOriginMatcher);
    if (match) {
      const FIRST_GROUP_MATCHED_INDEX = 1;
      return match[FIRST_GROUP_MATCHED_INDEX];
    }
  }
};

export const getOriginWhiteList = () => {
  const html = getHtmlAsset();
  const htmlUriObj = Image.resolveAssetSource(html);
  return [getUriOrigin(htmlUriObj.uri), '*'];
};

export const getSource = (): {html: string, baseUrl: string} => {
  const jsAsset = getJsAsset();
  return {
    html: jsAsset.html.toString(),
    baseUrl: Platform.OS === 'ios' ? './' : 'file:///android_asset/',
  };
};

const createGetPluginsFunctionString = (plugins: AtomicPlugin[]) => {
  const pluginsCreatorArray = plugins.map((plugin) => `
    {
      createPlugin: function() {
        ${plugin.scriptString};
        return window.${plugin.scriptWindowEntry}();
      }
    }
  `);
  return `[${pluginsCreatorArray.join(',')}]`;
};

export const getScriptToEvaluate = (content: WebEditorProps['content'], primaryColor: WebEditorProps['primaryColor'], plugins: AtomicPlugin[], extraProps: WebEditorProps['extraProps'], theme: WebEditorProps['theme'], fontsToLoad: WebEditorProps['fontsToLoad']): string => {
  const contentString = content ? `JSON.parse(${JSON.stringify(JSON.stringify(content))})` : 'undefined';
  const themeString = theme ? JSON.stringify(theme) : 'undefined';
  const fontsToLoadString = fontsToLoad ? JSON.stringify(fontsToLoad) : 'undefined';
  return `try {
      window.__EDITOR_CONTENT__ = ${contentString}
      const props = {
        content: __EDITOR_CONTENT__,
        extraProps: ${JSON.stringify(extraProps)},
        primaryColor: \`${primaryColor}\`,
        theme: ${themeString},
        fontsToLoad: ${fontsToLoadString},
        pluginsCreators: ${createGetPluginsFunctionString(plugins)}
      };
      window.WebRce.renderEditor(document.getElementById('root'), props);
    } catch (e) {
      window.err = e;
    }
    `;
};
