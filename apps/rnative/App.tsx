import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import {Editor} from '@react-native-rich-content/editor';
import {Viewer} from '@react-native-rich-content/viewer';
import {
  Content,
  EditorRef,
  AtomicPlugin,
} from '@react-native-rich-content/common';
import {imageViewerPlugin} from './src/plugins/image/viewer-plugin';
import {createEditorPlugins} from './src/plugins/create-editor-plugins';

const viewerPlugins = [imageViewerPlugin];

const App = () => {
  const editorRef = useRef<EditorRef>(null);
  const [plugins, setPlugins] = useState<AtomicPlugin[]>([]);
  const [content, setContent] = useState<Content>({blocks: [], entityMap: {}});
  useEffect(() => {
    if (editorRef.current) {
      setPlugins(createEditorPlugins(editorRef.current));
    }
  }, []);

  return (
    <ScrollView style={styles.root}>
      <Text>Editor:</Text>
      <Editor
        ref={editorRef}
        plugins={plugins}
        content={content}
        style={styles.editor}
        onContentChange={setContent}
      />
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
