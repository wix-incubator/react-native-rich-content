import {getHtmlAsset, getJsAsset, WebEditorProps} from '../web-assets';
import {Image} from 'react-native';
import { AtomicPlugin } from '@react-native-rich-content/common';

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
    return [getUriOrigin(htmlUriObj.uri)];
}

export const getSource = (): {html: string} =>{
    const jsAsset = getJsAsset();
    return {html: jsAsset.html.toString()};
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

export const getScriptToEvaluate = (content: WebEditorProps['content'], primaryColor: WebEditorProps['primaryColor'], plugins: AtomicPlugin[], extraProps: WebEditorProps['extraProps']): string => {
    const contentString = content ? `JSON.parse(${JSON.stringify(JSON.stringify(content))})` : 'undefined';
    return `try {
      window.__EDITOR_CONTENT__ = ${contentString}
      const props = {
        content: __EDITOR_CONTENT__,
        extraProps: ${JSON.stringify(extraProps)},
        primaryColor: \`${primaryColor}\`,
        pluginsCreators: ${createGetPluginsFunctionString(plugins)}
      };
      window.WebRce.renderEditor(document.getElementById('root'), props);
    } catch (e) {
      window.err = e;
    }
    `;
};