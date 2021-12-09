export interface Size {
  height: number;
  width: number;
}

export type CreatePluginEntity = (data: any) => object;

export interface EditorPluginProps<Insert> {
  createEntityWithAsyncUploads?: CreateEntityWithAsyncUploads;
  toolbarIcon: number;
  getToolbarConfig: ({
    entity,
    updateEntity,
    deleteEntity,
    primaryColor,
    entityType,
    isPluginSpoilerAlertEnabled,
  }: {
    entity: any;
    updateEntity: (data: any) => void;
    deleteEntity: () => void;
    primaryColor: string;
    entityType: string;
    isPluginSpoilerAlertEnabled: boolean;
  }) => any;
  ctaText: string;
  config?: any;
  onPress: (insert: Insert, insertAsync?: InsertAsync) => void;
}

export interface DefaultEditorPluginProps {
  pluginId: string;
}

export type AtomicPlugin = {
  id: string;
  ctaText: string;
  pluginId: string;
  toolbarIcon: number;
  onPress: Function;
  config: Object;
  createEntityWithAsyncUploads?: any;
  getToolbarConfig: Function;
  draftEntityTypes: Array<string>;
  createPluginEntity: Function;
  buttonId?: string;
};

export type InsertAsync = (
  placeholderData: object,
  asyncUpdateIds: Array<string>,
  metadata?: object
) => void;
