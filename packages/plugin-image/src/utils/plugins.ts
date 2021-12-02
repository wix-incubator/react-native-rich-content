import { Assets } from 'react-native-ui-lib';
import {PLUGIN_ID} from '../constants';

const DEFAULT_TOOLBAR_ICON = Assets.icons.general.camera;

export const editorPluginCreator = (createPluginEntity: CreatePluginEntity, draftEntityTypes: Array<string>): (props: PluginPropsImage) => ImagePlugin => {
  validateEditorPlugin(createPluginEntity, draftEntityTypes);
  return ({onPress, createEntityWithAsyncUploads, toolbarIcon, getToolbarConfig, ctaText}) => ({
    id: draftEntityTypes.sort().join('-'),
    ctaText,
    draftEntityTypes,
    toolbarIcon: typeof toolbarIcon === 'number' ? toolbarIcon as number: DEFAULT_TOOLBAR_ICON,
    getToolbarConfig,
    createEntityWithAsyncUploads,
    onPress,
    createPluginEntity,
    pluginId: PLUGIN_ID,
  });
};

function validateEditorPlugin(createPluginEntity: CreatePluginEntity, draftEntityTypes: Array<string>) {
  if (!createPluginEntity || !draftEntityTypes || typeof draftEntityTypes !== 'object' || draftEntityTypes.length < 1) {
    throw new Error('Editor plugin invalid. Did you pass a draftEntityTypes array as the second parameter?');
  }
};
