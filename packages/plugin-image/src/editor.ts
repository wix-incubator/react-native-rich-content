import {editorPluginCreator} from '../../common';
import {ENTITY_TYPE, PLUGIN_ID} from './constants';
import {CreateImageEntityProps, InsertImage} from './types';

export const createPluginEntity = ({image, alignment = 'center'}: CreateImageEntityProps) => {
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

export default editorPluginCreator<InsertImage>(createPluginEntity, [ENTITY_TYPE], {pluginId: PLUGIN_ID});
