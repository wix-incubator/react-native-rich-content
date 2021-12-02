declare type PluginData = any

type PluginIdImage = 'image'

type CreatePluginEntity = (data: any) => object;

type ImagePluginSrc = string | {
  id?: string;
  original_file_name: string;
  file_name: string;
  width: number;
  height: number;
}

type InsertAsync = (
    placeholderData: object,
    asyncUpdateIds: Array<string>,
    metadata?: object
    ) => void;

type CreateImageEntityProps = {
    image: ImagePluginSrc;
    alignment?: string;
};
  
declare type InsertImage = (props: CreateImageEntityProps) => void

interface ImagePlugin {
  id: string;
  ctaText: string;
  pluginId: PluginIdImage;
  toolbarIcon: number;
  onPress: Function;
  getToolbarConfig: Function;
  draftEntityTypes: Array<string>;
  createPluginEntity: Function;
  createEntityWithAsyncUploads?: any;
}
declare type PluginPropsImage = {
  toolbarIcon?: number;
  getToolbarConfig: ({
    entity,
    updateEntity,
    deleteEntity,
    primaryColor,
    entityType,
    isPluginSpoilerAlertEnabled,
  }: {
    entity: PluginData;
    updateEntity: (data: any) => void;
    deleteEntity: () => void;
    primaryColor: string;
    entityType: string;
    isPluginSpoilerAlertEnabled: boolean;
  }) => any;
  ctaText: string;
  onPress: (insert: InsertImage, insertAsync: InsertAsync) => void;
  createEntityWithAsyncUploads: any;
}

declare interface Size { 
  height: number,
  width: number,
}