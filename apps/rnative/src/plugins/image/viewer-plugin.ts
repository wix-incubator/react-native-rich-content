import {ViewerPlugin} from '@react-native-rich-content/common';
import {
  createImageViewerPlugin,
  ImageData,
  imageServices,
} from '@react-native-rich-content/plugin-image';
import {ENTITY_TYPE} from './constants';

export const imageViewerPlugin: ViewerPlugin<ImageData> =
  createImageViewerPlugin({
    entityType: ENTITY_TYPE,
    containerStyle: {
      marginTop: 12,
      marginBottom: 12,
    },
    captionStyle: {
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 6,
      paddingTop: 9,
      color: 'grey',
      textAlign: 'center',
    },
    onPress: data =>
      console.log(
        'THIS IS THE SOURCE IN VIEWER: ',
        imageServices.getImageSource(data),
      ),
  });
