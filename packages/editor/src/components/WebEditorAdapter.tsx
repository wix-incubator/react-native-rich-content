import React, {useImperativeHandle} from 'react';
import {WebView} from 'react-native-webview';
import { WebEditorAdapterProps } from '../types';
import { useWebEditorAdapter } from './useWebEditorAdapter';

export type WebEditorAdapterRef = {
  invoke: (method: string, param: string) => void;
}

export const  WebEditorAdapter = React.forwardRef((props: WebEditorAdapterProps, ref) => {

  const {style} = props;
  const {source, scriptToEvaluate, webviewRef, originWhiteList, handleMessage} = useWebEditorAdapter(props);

  useImperativeHandle(ref, (): WebEditorAdapterRef => ({
    invoke: (method, param) => webviewRef.current?.injectJavaScript(`window.rceApi.${method}(${param})`)
  }));

  return (
    <WebView
      style={style}
      ref={webviewRef}
      originWhitelist={originWhiteList}
      injectedJavaScript={scriptToEvaluate}
      source={source}
      onMessage={handleMessage}
      hideKeyboardAccessoryView
      allowsInlineMediaPlayback
      applicationNameForUserAgent={'WixOneAppRichContent/1.0.0'}
    />
  );
});
