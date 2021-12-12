import {Falsy} from 'react-native';
import {ImageData} from '../types';
import linkifyIt from 'linkify-it';
import {get} from 'lodash';

const linkify = linkifyIt();

// If the url doesn't have protocol indicated - add 'http://'
const getUrlWithProtocol = (url: string) => {
  return get(linkify.match(url), '[0].url', '');
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
