
export const editorPluginCreator = (createPluginEntity: CreatePluginEntity, draftEntityTypes: Array<string>): (props: PluginProps) => any => {
    validateEditorPlugin(createPluginEntity, draftEntityTypes);
    return ({onPress, createEntityWithAsyncUploads, pluginId, toolbarIcon, getToolbarConfig, ctaText, config}: PluginProps) => ({
      id: draftEntityTypes.sort().join('-'),
      ctaText,
      draftEntityTypes,
      toolbarIcon,
      getToolbarConfig,
      createEntityWithAsyncUploads,
      onPress,
      pluginId,
      config,
      createPluginEntity,
    });
};
  
function validateEditorPlugin(createPluginEntity: Function, draftEntityTypes: Array<string>) {
    if (!createPluginEntity || !draftEntityTypes || typeof draftEntityTypes !== 'object' || draftEntityTypes.length < 1) {
        throw new Error('Editor plugin invalid. Did you pass a draftEntityTypes array as the second parameter?');
    }
}