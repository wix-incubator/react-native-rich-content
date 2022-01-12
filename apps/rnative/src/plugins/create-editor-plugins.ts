import {EditorRef} from '@react-native-rich-content/common';
import {ToolbarItem} from '@react-native-rich-content/toolbar';
import {createImageEditorPluginWithEditorRef} from './image/editor-plugin';

export const createEditorPlugins = (
  editorRef: EditorRef,
  setToolbarItems: (items: ToolbarItem[]) => void,
  setDefaultToolbarItems: () => void,
) => [
  createImageEditorPluginWithEditorRef(
    editorRef,
    setToolbarItems,
    setDefaultToolbarItems,
  ),
];
