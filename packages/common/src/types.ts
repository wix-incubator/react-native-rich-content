import { FC, ReactNode } from 'react';
import { StyleProp, ImageStyle } from 'react-native';
import { InlineStyle } from 'wix-rich-content-common';

export interface Size {
  height: number;
  width: number;
}

export type EditorRef = {
  insert: (entity: any) => void;
  deletePluginEntity: (blockKey: string) => void;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
};

export type ToolbarConfig = any; // TODO

export type CreatePluginEntity<RequiredEntityData, EntityType> = (
  data: RequiredEntityData
  ) => EntityType;

export interface AtomicPlugin extends AtomicPluginConfig {
  scriptString: string;
  scriptWindowEntry: string;
}

export interface AtomicPluginConfig {
  id: string;
  onEntityFocus?: (data: any) => void;
}

interface ViewerPluginComponentProps<DataType> {
    data: DataType;
    key: string | number;
    children: ReactNode;
}

export type ViewerPlugin<DataType> = {
    component: FC<ViewerPluginComponentProps<DataType>>;
    previewThumbnail?: PreviewThumbnailComponent<DataType>;
    entityType: string;
};

export interface Content {
  blocks: Object;
  entityMap: Object;
}

export type ViewerPluginCreator<ConfigType, DataType> = (
  config: ConfigType
  ) => ViewerPlugin<DataType>;

interface PreviewThumbnailProps<Entity> {
  data: Entity;
  style?: StyleProp<ImageStyle>;
}

export type PreviewThumbnailComponent<Entity> = FC<PreviewThumbnailProps<Entity>>;
