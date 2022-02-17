import React, { useImperativeHandle } from 'react';
import { View } from 'react-native';
import { WebEditorAdapter } from './WebEditorAdapter';
import { EditorProps } from '../types';
import { useEditor } from './useEditor';

export const Editor = React.forwardRef((props: EditorProps, ref) => {
  const { content, style, plugins } = props;
  const {
    webEditorAdapterRef,
    getEditorRefApi,
    onDraftEntityFocusChange,
    onRceStateChange,
  } = useEditor(props);
  useImperativeHandle(ref, getEditorRefApi);

  return (
    <View style={style}>
      <WebEditorAdapter
        content={content}
        style={style}
        ref={webEditorAdapterRef}
        onRceStateChange={onRceStateChange}
        onDraftEntityFocusChange={onDraftEntityFocusChange}
        plugins={plugins}
      />
    </View>
  );
});
