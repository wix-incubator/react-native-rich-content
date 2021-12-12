import {CreatePluginEntity, EditorPluginProps, AtomicPlugin} from './types';

export function editorPluginCreator<RequiredEntityData, Entity>(
  createPluginEntity: CreatePluginEntity<RequiredEntityData, Entity>, pluginId: string) {
  return (editorPluginProps: EditorPluginProps): AtomicPlugin<RequiredEntityData, Entity> => ({
    id: pluginId,
    createPluginEntity,
    ...editorPluginProps
  });
}
