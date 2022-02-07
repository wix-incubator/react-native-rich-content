import React from 'react';
import {Content} from '@react-native-rich-content/common';
import {RicosEditor, RicosEditorProps} from 'ricos-editor';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { useWebEditor } from './useWebEditor';
import { PluginCreator } from '../types';

export interface WebEditorProps {
  content?: Content;
  primaryColor?: string;
  pluginsCreators: PluginCreator[];
  extraProps?: Omit<RicosEditorProps, 'toolbarSettings' | 'isMobile' | 'plugins' | 'ref' | 'content' | 'onChange' | 'onAtomicBlockFocus'>;
}

export const WebEditor = ({content, primaryColor, extraProps, pluginsCreators = []}: WebEditorProps) => {
  const {toolbarSettings, editorRef, handleChange, onAtomicBlockFocus, plugins} = useWebEditor(pluginsCreators, primaryColor);
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
