import React from 'react';
import {Content} from '@react-native-rich-content/common';
import {RicosEditor, RicosEditorProps} from 'ricos-editor';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { useWebEditor } from './useWebEditor';

export interface WebEditorProps {
  content?: Content;
  primaryColor?: string;
  extraProps?: Omit<RicosEditorProps, 'toolbarSettings' | 'isMobile' | 'plugins' | 'ref' | 'content' | 'onChange' | 'onAtomicBlockFocus'>;
}

export const WebEditor = ({content, primaryColor, extraProps}: WebEditorProps) => {
  const {toolbarSettings, editorRef, plugins, handleChange, onAtomicBlockFocus} = useWebEditor(primaryColor);
  return (
      <RicosEditor
        toolbarSettings={toolbarSettings}
        isMobile
        plugins={plugins}
        ref={editorRef}
        content={content}
        onChange={handleChange}
        onAtomicBlockFocus={onAtomicBlockFocus}
        {...extraProps}
      />
  );
}
