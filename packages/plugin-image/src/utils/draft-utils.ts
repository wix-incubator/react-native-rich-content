import {Falsy} from 'react-native';
import {EditorRef} from '@react-native-rich-content/common';
import linkifyIt from 'linkify-it';
import {get, isString} from 'lodash';
import {ImageSrcObject, CreateImageEntityProps, ImageEntity, ImageData} from '../types';
import {ENTITY_TYPE} from '../constants';

const linkify = linkifyIt();

// If the url doesn't have protocol indicated - add 'http://'
const getUrlWithProtocol = (url: string) => {
  return get(linkify.match(url), '[0].url', '');
};

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

export const getImageLink = (image: ImageData): string | null => {
  const config = image.config || null;
  if (!config) {
    return null;
  }
  const url = config.link?.url || '';
  return getUrlWithProtocol(url);
};

export const getImageCaption = (image: ImageData): string | Falsy => image?.config?.showTitle && image?.metadata?.caption;

export const shouldEnableImageExpand = (image: ImageData): boolean => !image.disableExpand;

export const shouldEnableImageDownload = (image: ImageData): boolean => !image.disableDownload;

export const isImageLoading = (image: ImageData): boolean => !!image.loading;

export const getImageSource = (image: ImageData): string | null => isString(image.src) ? image.src as string : null;

export const insertImageToEditor = (imageSrc: string | ImageSrcObject, editorRef: EditorRef) => {
  const newEntity = createPluginEntity({image: imageSrc});
  editorRef.insert(newEntity);
}