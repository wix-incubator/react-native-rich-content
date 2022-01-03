import React from 'react';
import {ImageToolbarButton} from './plugins/image/ImageToolbarButton';
import {EditorRef} from '@react-native-rich-content/common';
export const getToolbarItems = (editorRef: EditorRef | null) => [
  {
    component: () => <ImageToolbarButton editorRef={editorRef} />,
  },
];
