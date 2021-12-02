import {editorPluginCreator} from './utils/plugins';
import {ENTITY_TYPE} from './constants';

export const createPluginEntity = ({image, alignment = 'center'}) => {
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

const createEditorPlugin = editorPluginCreator(createPluginEntity, [ENTITY_TYPE]);

export default createEditorPlugin;
