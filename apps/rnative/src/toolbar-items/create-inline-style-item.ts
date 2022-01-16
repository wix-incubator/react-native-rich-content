import {EditorRef} from '@react-native-rich-content/common';
import {ToolbarItem} from '@react-native-rich-content/toolbar';
import {InlineStyle} from 'wix-rich-content-common';

export const createInlineStyleItemGetter =
  (
    inlineStyle: InlineStyle,
    icon: number,
  ): ((
    editorRef: EditorRef,
    activeInlineStyles: InlineStyle[],
  ) => ToolbarItem) =>
  (editorRef, activeInlineStyles) => ({
    onPress: () => {
      editorRef.toggleInlineStyle(inlineStyle);
    },
    icon,
    isPressed: activeInlineStyles.includes(inlineStyle),
  });
