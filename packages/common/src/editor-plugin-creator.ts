import {CreatePluginEntity, EditorPluginProps, DefaultEditorPluginProps, AtomicPlugin} from './types';

export function editorPluginCreator<InsertType>(createPluginEntity: CreatePluginEntity, draftEntityTypes: Array<string>, defaultProps: DefaultEditorPluginProps) {
  validateEditorPlugin(createPluginEntity, draftEntityTypes);
  return ({onPress, createEntityWithAsyncUploads, toolbarIcon, getToolbarConfig, ctaText, config}: EditorPluginProps<InsertType>): AtomicPlugin => ({
    ...defaultProps,
    id: draftEntityTypes.sort().join('-'),
    ctaText,
    draftEntityTypes,
    toolbarIcon,
    getToolbarConfig,
    createEntityWithAsyncUploads,
    onPress,
    config,
    createPluginEntity,
  });
}

function validateEditorPlugin(createPluginEntity: CreatePluginEntity, draftEntityTypes: Array<string>) {
  if (!createPluginEntity || !draftEntityTypes || typeof draftEntityTypes !== 'object' || draftEntityTypes.length < 1) {
    throw new Error('Editor plugin invalid. Did you pass a draftEntityTypes array as the second parameter?');
  }
}
