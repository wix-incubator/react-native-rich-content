import { EditorPlugin } from 'wix-rich-content-common';

export interface RceApi {
    [editorMethod: string]: (serializedData: string) => void;
};

export type PluginCreator = {
    createPlugin: () => EditorPlugin;
};
