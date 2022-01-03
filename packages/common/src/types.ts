import {FC, ReactNode} from 'react';

export interface Size {
  height: number;
  width: number;
}

export type EditorRef = {
  insert: (entity: any) => void;
};

export type ToolbarConfig = any; // TODO

export type CreatePluginEntity<RequiredEntityData, EntityType> = (data: RequiredEntityData) => EntityType;

export type AtomicPlugin = {
  id: string;
  ctaText: string;
  toolbarIcon: number;
  onPress: () => void;
  getToolbarConfig?: () => void;
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

export interface Content {
  blocks: Object;
  entityMap: Object;
}

export type ViewerPluginCreator<ConfigType, DataType> = (config: ConfigType) => ViewerPlugin<DataType>;