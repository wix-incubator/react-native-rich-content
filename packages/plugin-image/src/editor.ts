import {editorPluginCreator} from '@react-native-rich-content/common';
import {ENTITY_TYPE, PLUGIN_ID} from './constants';
import {CreateImageEntityProps, ImageEntity} from './types';

const createPluginEntity = ({image, alignment = 'center'}: CreateImageEntityProps): ImageEntity => {
  return {
    pluginType: ENTITY_TYPE,
    data: {
      src: image,
      config: {
        alignment,
        size: 'content',
        showTitle: false,
        showDescription: false,
        key: String(Math.abs(Math.random() * 1000)),
      },
      metadata: {},
    },
  };
};

export const createImageEditorPlugin = editorPluginCreator<CreateImageEntityProps, ImageEntity>(createPluginEntity, PLUGIN_ID);
