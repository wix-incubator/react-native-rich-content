import {createEditorImagePlugin} from '@react-native-rich-content/plugin-image';
import {AtomicPlugin, EditorRef} from '@react-native-rich-content/common';
import {ToolbarItem} from '@react-native-rich-content/toolbar';
import {ENTITY_TYPE} from './constants';

const trashIcon = require('../../../assets/trash-icon.jpeg');

const getToolbarItemsForFocusedImage = (
  editorRef: EditorRef,
  blockKey: string,
): ToolbarItem[] => [
  {
    icon: trashIcon,
    onPress: () => editorRef.deletePluginEntity(blockKey),
  },
];

export const createImageEditorPluginWithEditorRef = (
  editorRef: EditorRef,
  setToolbarItems: (toolbarItems: ToolbarItem[]) => void,
): AtomicPlugin => {
  return createEditorImagePlugin({
    id: ENTITY_TYPE,
    onEntityFocus: data =>
      setToolbarItems(getToolbarItemsForFocusedImage(editorRef, data.blockKey)),
  });
};
