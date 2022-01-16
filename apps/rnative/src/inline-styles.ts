import {EditorRef} from '@react-native-rich-content/common';
import {ToolbarItem} from '@react-native-rich-content/toolbar';
import {InlineStyle} from 'wix-rich-content-common';

const boldIcon = require('../assets/bold_icon.png');

export const getBoldToolbarItem = (
  editorRef: EditorRef,
  activeInlineStyles: InlineStyle[],
): ToolbarItem => {
  return {
    onPress: () => {
      editorRef.toggleInlineStyle('bold');
    },
    icon: boldIcon,
    isPressed: activeInlineStyles.includes('bold'),
  };
};
