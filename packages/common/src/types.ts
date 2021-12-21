import {FC, ReactNode} from 'react';

export interface Size {
  height: number;
  width: number;
}

export type EditorRef = any; // TODO
export type ToolbarConfig = any; // TODO

export type CreatePluginEntity<RequiredEntityData, Entity> = (data: RequiredEntityData) => Entity;

export interface EditorPluginProps {
  toolbarIcon: number;
  getToolbarConfig: (editorRef: EditorRef) => ToolbarConfig;
  displayName: string;
  onInsert: (editorRef: EditorRef) => void;
  onInsertAsync: (editorRef: EditorRef) => void;
}

export type AtomicPlugin<RequiredEntityData, Entity> = {
  id: string;
  displayName: string;
  toolbarIcon: number;
  onInsert: (editorRef: EditorRef) => void;
  onInsertAsync: (editorRef: EditorRef) => void;
  getToolbarConfig: (editorRef: EditorRef) => ToolbarConfig;
  createPluginEntity: CreatePluginEntity<RequiredEntityData, Entity>;
};

interface ViewerPluginComponentProps<DataType> {
    data: DataType;
    key: string | number;
    children: ReactNode;
};

export type ViewerPlugin<DataType> = {
    component: FC<ViewerPluginComponentProps<DataType>>;
    entityType: string;
};

export type ViewerPluginCreator<ConfigType, DataType> = (config: ConfigType) => ViewerPlugin<DataType>;