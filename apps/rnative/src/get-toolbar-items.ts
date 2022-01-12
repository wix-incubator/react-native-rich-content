import {EditorRef} from '@react-native-rich-content/common';
import {getImageToolbarItem} from './plugins/image/toolbar-item';

export const getToolbarItems = (editorRef: EditorRef) => [
  getImageToolbarItem(editorRef),
];
