import {EditorRef} from '@react-native-rich-content/common';
import {createImageEditorPluginWithEditorRef} from './image/editor-plugin';

export const createEditorPlugins = (editorRef: EditorRef) => [
  createImageEditorPluginWithEditorRef(editorRef),
];
