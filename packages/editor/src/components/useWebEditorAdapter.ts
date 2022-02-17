import { useRef, useCallback } from 'react';
import { EDITOR_EVENTS } from '../web-assets';
import { getOriginWhiteList, getSource, getScriptToEvaluate } from '../utils/web-editor-adapter-utils';
import { WebEditorAdapterProps } from '../types';

const originWhiteList = getOriginWhiteList();
const source = getSource();

export const useWebEditorAdapter = (props: Omit<WebEditorAdapterProps, 'style'>) => {
  const {
    content,
    primaryColor,
    extraProps,
    onDraftEntityFocusChange,
    onRceStateChange,
    onWebEditorDidMount,
    plugins,
  } = props;
  const webviewRef = useRef<{injectJavaScript:(str: string) => void}>(null);
  const handleMessage = useCallback((event: {nativeEvent: {data: string}}) => {
    try {
      const eventData: {type: string; data: any} = JSON.parse(event.nativeEvent.data);
      switch (eventData.type) {
        case EDITOR_EVENTS.RCE_STATE_CHANGED:
          props.onRceStateChange?.(eventData.data);
          break;
        case EDITOR_EVENTS.PLUGIN_ENTITY_FOCUS_CHANGED:
          props.onDraftEntityFocusChange?.(eventData.data);
          break;
        case EDITOR_EVENTS.WEB_EDITOR_DID_MOUNT:
          props.onWebEditorDidMount?.();
          break;
        default:
          return;
      }
    } catch (e) {
      console.log('Error', e, 'while parsing', event);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDraftEntityFocusChange, onRceStateChange, onWebEditorDidMount]);
  return {
    webviewRef,
    originWhiteList,
    source,
    scriptToEvaluate: getScriptToEvaluate(content, primaryColor, plugins, extraProps),
    handleMessage,
  };
};
