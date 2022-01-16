import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Editor} from '@react-native-rich-content/editor';
import {Toolbar} from '@react-native-rich-content/toolbar';
import {Content} from '@react-native-rich-content/common';
import {useConsumerEditor} from './useConsumerEditor';

interface ConsumerEditorProps {
  content: Content;
  setContent: (content: Content) => void;
}

export const ConsumerEditor = ({content, setContent}: ConsumerEditorProps) => {
  const {
    editorRef,
    plugins,
    onNonAtomicFocus,
    onAtomicFocus,
    onInlineStylesChange,
    toolbarItems,
  } = useConsumerEditor();
  return (
    <View>
      <Editor
        ref={editorRef}
        plugins={plugins}
        content={content}
        style={styles.editor}
        onContentChange={setContent}
        onNonAtomicFocus={onNonAtomicFocus}
        onAtomicFocus={onAtomicFocus}
        onInlineStylesChange={onInlineStylesChange}
      />
      <Toolbar items={toolbarItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  editor: {
    height: 500,
    width: '100%',
  },
});
