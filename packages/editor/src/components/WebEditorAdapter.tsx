import React, { useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { WebEditorAdapterProps } from '../types';
import { useWebEditorAdapter } from './useWebEditorAdapter';

export type WebEditorAdapterRef = {
  invoke: (method: string, param: string) => void;
}

export const WebEditorAdapter = React.forwardRef((props: WebEditorAdapterProps, ref) => {
  const { style } = props;
  const {
    source,
    scriptToEvaluate,
    webviewRef,
    originWhiteList,
    handleMessage,
  } = useWebEditorAdapter(props);

  useImperativeHandle(ref, (): WebEditorAdapterRef => ({
    invoke: (method, param) => webviewRef.current?.injectJavaScript(`window.rceApi.${method}(${param})`),
  }));

  return (
    <WebView
      useWebKit
      style={[styles.webview, style]}
      ref={webviewRef}
      originWhitelist={originWhiteList}
      injectedJavaScript={scriptToEvaluate}
      source={source}
      onMessage={handleMessage}
      hideKeyboardAccessoryView
      allowsInlineMediaPlayback
      applicationNameForUserAgent="WixOneAppRichContent/1.0.0"
    />
  );
});

const styles = StyleSheet.create({
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 200,
    width: '100%',
  },
});
