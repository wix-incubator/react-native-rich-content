import {EditorRef} from '@react-native-rich-content/common';
import {createImageEditorPlugin} from './image/editor-plugin';

export const createEditorPlugins = (editorRef: EditorRef) => [
  createImageEditorPlugin(editorRef),
];
