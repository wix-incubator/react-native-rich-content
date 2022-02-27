import React from 'react';
import { RicosEditor } from 'ricos-editor';
import 'wix-rich-content-editor/dist/styles.min.css';
import 'wix-rich-content-editor-common/dist/styles.min.css';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { useWebEditor } from './useWebEditor';
import { WebEditorProps } from '../types';

export function WebEditor({
  content, primaryColor, extraProps, pluginsCreators = [], theme, fontsToLoad,
}: WebEditorProps) {
  const {
    toolbarSettings, editorRef, handleChange, onAtomicBlockFocus, plugins,
  } = useWebEditor(pluginsCreators, primaryColor, fontsToLoad);
  return (
    <RicosEditor
      theme={theme}
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
