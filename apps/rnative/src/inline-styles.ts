import {EditorRef} from '@react-native-rich-content/common';
import {ToolbarItem} from '@react-native-rich-content/toolbar';

const boldIcon = require('../assets/bold_icon.png');

export const getBoldToolbarItem = (editorRef: EditorRef): ToolbarItem => ({
  onPress: () => editorRef.toggleInlineStyle('bold'),
  icon: boldIcon,
});
