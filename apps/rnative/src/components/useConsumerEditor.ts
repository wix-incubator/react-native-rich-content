import {useRef, useState, useEffect, useCallback} from 'react';
import {ToolbarItem} from '@react-native-rich-content/toolbar';
import {EditorRef, AtomicPlugin} from '@react-native-rich-content/common';
//import {EditorProps} from '@react-native-rich-content/editor';
import {InlineStyle} from 'wix-rich-content-common';
import {createEditorPlugins} from '../plugins/create-editor-plugins';
import {getToolbarItems} from '../toolbar-items/get-toolbar-items';

export const useConsumerEditor = () => {
  const editorRef = useRef<EditorRef>(null);
  const [plugins, setPlugins] = useState<AtomicPlugin[]>([]);
  const [toolbarItems, setToolbarItems] = useState<ToolbarItem[]>([]);
  const [isAtomicPluginFocused, setIsAtomicPluginFocused] =
    useState<boolean>(false);
  const [activeInlineStyles, setActiveInlineStyles] = useState<InlineStyle[]>(
    [],
  );

  useEffect(() => {
    if (editorRef.current) {
      setPlugins(createEditorPlugins(editorRef.current, setToolbarItems));
    }
  }, []);

  const setIsAtomicPluginFocusedToTrue = useCallback(
    () => setIsAtomicPluginFocused(true),
    [],
  );

  const onNonAtomicFocus = useCallback(() => {
    if (editorRef.current) {
      setToolbarItems(getToolbarItems(editorRef.current, activeInlineStyles));
      setIsAtomicPluginFocused(false);
    }
  }, [activeInlineStyles]);

  useEffect(() => {
    if (editorRef.current && !isAtomicPluginFocused) {
      setToolbarItems(getToolbarItems(editorRef.current, activeInlineStyles));
    }
  }, [activeInlineStyles, isAtomicPluginFocused]);

  return {
    editorRef,
    plugins,
    onNonAtomicFocus,
    onAtomicFocus: setIsAtomicPluginFocusedToTrue,
    onInlineStylesChange: setActiveInlineStyles,
    toolbarItems,
  };
};
