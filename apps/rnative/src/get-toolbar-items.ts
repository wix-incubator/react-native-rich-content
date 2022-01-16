import {EditorRef} from '@react-native-rich-content/common';
import {InlineStyle} from 'wix-rich-content-common';
import {getImageToolbarItem} from './plugins/image/toolbar-item';
import {getBoldToolbarItem} from './inline-styles';

export const getToolbarItems = (
  editorRef: EditorRef,
  activeInlineStyles: InlineStyle[],
) => [
  getImageToolbarItem(editorRef),
  getBoldToolbarItem(editorRef, activeInlineStyles),
];
