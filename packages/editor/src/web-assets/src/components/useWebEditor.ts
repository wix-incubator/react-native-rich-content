import {
  useRef, useCallback, useEffect, useMemo,
} from 'react';
import { RicosEditorType } from 'ricos-editor';
import { getActiveInlineStyles } from '../utils/inline-styles';
import { useConstructor } from './useConstructor';
import { EDITOR_EVENTS } from '../constants';
import { getToolbarSettings } from '../utils/get-toolbar-settings';
import {
  postWebviewMessage, setRceApi, setPrimaryColor, loadFonts,
} from '../utils/global-utils';
import { createRceApi } from '../utils/create-rce-api';
import { PluginCreator, FontData } from '../types';

const toolbarSettings = { getToolbarSettings };

export const useWebEditor = (
  pluginCreators: PluginCreator[],
  primaryColor?: string,
  fontsToLoad?: FontData[],
) => {
  const editorRef = useRef<RicosEditorType>(null);

  const handleChange = useCallback((content?) => {
    postWebviewMessage({
      type: EDITOR_EVENTS.RCE_STATE_CHANGED,
      data: {
        activeInlineStyles: getActiveInlineStyles(editorRef.current),
        content,
      },
    });
  }, []);

  const updateEntityFocusData = useCallback(({ blockKey, type, data }) => {
    postWebviewMessage({
      type: EDITOR_EVENTS.PLUGIN_ENTITY_FOCUS_CHANGED,
      data: {
        blockKey,
        type,
        data,
      },
    });
  }, []);

  useConstructor(() => {
    if (fontsToLoad) {
      loadFonts(fontsToLoad);
    }
    setPrimaryColor(primaryColor);
    const api = createRceApi(editorRef, handleChange, updateEntityFocusData);
    setRceApi(api);
  });

  useEffect(() => postWebviewMessage({ type: EDITOR_EVENTS.WEB_EDITOR_DID_MOUNT }), []);

  const plugins = useMemo(() => pluginCreators
    .map((creator) => creator.createPlugin()), [pluginCreators]);

  return {
    toolbarSettings,
    editorRef,
    handleChange,
    onAtomicBlockFocus: updateEntityFocusData,
    plugins,
  };
};
