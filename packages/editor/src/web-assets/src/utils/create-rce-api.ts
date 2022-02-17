import { InlineStyle } from 'wix-rich-content-common';
import React from 'react';
import { RicosEditorType } from 'ricos-editor';
import { EDITOR_METHODS } from '../constants';
import { RceApi } from '../types';
import { isValidInlineStyle } from './inline-styles';

export const createRceApi = (
  editorRef: React.RefObject<RicosEditorType>,
  handleChange: (content?: any) => void,
  updateEntityFocusData: ({ blockKey, type, data }: any) => void,
): RceApi => ({
  [EDITOR_METHODS.INSERT_PLUGIN_ENTITY]: (serializedData) => {
    if (editorRef.current) {
      const { pluginType, data } = JSON.parse(serializedData);
      const { insertBlock } = editorRef.current.getEditorCommands();
      const createdBlockKey = insertBlock(pluginType, data);
      handleChange();
      updateEntityFocusData({
        blockKey: createdBlockKey,
        type: pluginType,
        data,
      });
    }
  },
  [EDITOR_METHODS.DELETE_PLUGIN_ENTITY]: (serializedData) => {
    if (editorRef.current) {
      const blockKey = JSON.parse(serializedData);
      const { deleteBlock } = editorRef.current.getEditorCommands();
      deleteBlock(blockKey);
      handleChange();
    }
  },
  [EDITOR_METHODS.TOGGLE_INLINE_STYLE]: (inlineStyle: string) => {
    const parsedInlineStyle = JSON.parse(inlineStyle);
    if (editorRef.current && isValidInlineStyle(parsedInlineStyle)) {
      editorRef.current.getEditorCommands().toggleInlineStyle(parsedInlineStyle as InlineStyle);
      handleChange();
    }
  },
});
