import { EditorPlugin } from 'wix-rich-content-common';
import {Content} from '@react-native-rich-content/common';
import {RicosEditorProps} from 'ricos-editor';

export interface RceApi {
    [editorMethod: string]: (serializedData: string) => void;
};

export type PluginCreator = {
    createPlugin: () => EditorPlugin;
};

export interface WebEditorProps {
    content?: Content;
    primaryColor?: string;
    pluginsCreators: PluginCreator[];
    extraProps?: Omit<RicosEditorProps, 'toolbarSettings' | 'isMobile' | 'plugins' | 'ref' | 'content' | 'onChange' | 'onAtomicBlockFocus'>;
}