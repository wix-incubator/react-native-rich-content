import React, {useRef, useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {Editor} from '@react-native-rich-content/editor';
import {Viewer} from '@react-native-rich-content/viewer';
import {Toolbar, ToolbarItem} from '@react-native-rich-content/toolbar';
import {
  Content,
  EditorRef,
  AtomicPlugin,
} from '@react-native-rich-content/common';
import {InlineStyle} from 'wix-rich-content-common';
import {imageViewerPlugin} from './src/plugins/image/viewer-plugin';
import {createEditorPlugins} from './src/plugins/create-editor-plugins';
import {getToolbarItems} from './src/get-toolbar-items';

const viewerPlugins = [imageViewerPlugin];

const App = () => {
  const editorRef = useRef<EditorRef>(null);
  const [plugins, setPlugins] = useState<AtomicPlugin[]>([]);
  const [toolbarItems, setToolbarItems] = useState<ToolbarItem[]>([]);
  const [isAtomicPluginFocused, setIsAtomicPluginFocused] =
    useState<boolean>(false);
  const [content, setContent] = useState<Content>({blocks: [], entityMap: {}});
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

  return (
    <ScrollView style={styles.root}>
      <Text>Editor:</Text>
      <Editor
        ref={editorRef}
        plugins={plugins}
        content={content}
        style={styles.editor}
        onContentChange={setContent}
        onNonAtomicFocus={onNonAtomicFocus}
        onAtomicFocus={setIsAtomicPluginFocusedToTrue}
        onInlineStylesChange={setActiveInlineStyles}
      />
      <Toolbar items={toolbarItems} />
      <Text>Viewer:</Text>
      <Viewer plugins={viewerPlugins} content={content} style={styles.viewer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 500,
    width: 500,
    paddingTop: 100,
  },
  viewer: {
    marginBottom: 60,
    height: 500,
    width: '100%',
  },
  editor: {
    height: 500,
    width: '100%',
  },
});

export default App;
