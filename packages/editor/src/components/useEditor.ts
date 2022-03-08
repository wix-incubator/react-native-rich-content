import { useRef, useCallback, useState } from 'react';
import { Content, EditorRef } from '@react-native-rich-content/common';
import { InlineStyle } from 'wix-rich-content-common';
import { WebEditorAdapterRef } from './WebEditorAdapter';
import { EditorProps } from '../types';
import { prepareStringForInjection } from '../utils/stringify';
import { EDITOR_METHODS } from '../web-assets';

const TEXT_DATA_TYPE = 'text';

export const useEditor = (props: Omit<EditorProps, 'style' | 'content'>) => {
  const {
    onContentChange, plugins, onNonAtomicFocus, onInlineStylesChange, onAtomicFocus,
  } = props;
  const [isFocusOnText, setIsFocusOnText] = useState<boolean>(false);
  const webEditorAdapterRef = useRef<WebEditorAdapterRef>(null);

  const invokeEditorMethod = (method: string, data?: unknown) => {
    webEditorAdapterRef.current?.invoke(method, `'${prepareStringForInjection(JSON.stringify(data))}'`);
  };

  const getEditorRefApi = (): EditorRef => ({
    insert: (entity: unknown) => invokeEditorMethod(EDITOR_METHODS.INSERT_PLUGIN_ENTITY, entity),
    // eslint-disable-next-line max-len
    toggleInlineStyle: (inlineStyle: InlineStyle) => invokeEditorMethod(EDITOR_METHODS.TOGGLE_INLINE_STYLE, inlineStyle),
    // eslint-disable-next-line max-len
    deletePluginEntity: (blockKey: string) => invokeEditorMethod(EDITOR_METHODS.DELETE_PLUGIN_ENTITY, blockKey),
  });

  const onRceStateChange = useCallback((rceState: {
        content: Content,
        activeInlineStyles: InlineStyle[]
    }) => {
    if (rceState.content && onContentChange) {
      onContentChange?.(rceState.content);
    }
    onInlineStylesChange?.(rceState.activeInlineStyles);
  }, [onContentChange, onInlineStylesChange]);

  const onDraftEntityFocusChange = useCallback((data: {
      blockKey?: string,
      type?: string,
      data?: any
    }) => {
    // eslint-disable-next-line max-len
    const getPluginThatMatchesEntityType = (entityType: string) => plugins.find((plugin) => plugin.id === entityType);

    if (data.type) {
      if (data.type === TEXT_DATA_TYPE) {
        if (!isFocusOnText) {
          onNonAtomicFocus?.();
          setIsFocusOnText(true);
        }
      } else {
        const focusedPlugin = getPluginThatMatchesEntityType(data.type);
        focusedPlugin?.onEntityFocus?.(data);
        onAtomicFocus?.();
        setIsFocusOnText(false);
      }
    }
  }, [plugins, isFocusOnText, onNonAtomicFocus, onAtomicFocus]);

  return {
    webEditorAdapterRef,
    getEditorRefApi,
    onRceStateChange,
    onDraftEntityFocusChange,
  };
};
