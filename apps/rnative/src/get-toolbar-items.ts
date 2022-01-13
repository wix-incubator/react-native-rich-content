import {EditorRef} from '@react-native-rich-content/common';
import {getImageToolbarItem} from './plugins/image/toolbar-item';
import {getBoldToolbarItem} from './inline-styles';

export const getToolbarItems = (editorRef: EditorRef) => [
  getImageToolbarItem(editorRef),
  getBoldToolbarItem(editorRef),
];
