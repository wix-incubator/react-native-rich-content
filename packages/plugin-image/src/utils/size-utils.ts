import {Dimensions} from 'react-native';
import {isObject} from 'lodash';
import {ImageData} from '../types';
import {Size} from '@react-native-rich-content/common';

export const getFallbackImageSize = () => {
  const screenSize = Dimensions.get('window');
  return {
    width: screenSize.width,
    height: screenSize.width * 0.5625,
  };
};

export function getImageSize(imageSrc: ImageData['src'] | null, maxWidth: number): Size {
  if (!isObject(imageSrc)) {
    return getFallbackImageSize();
  }
  const ratio = maxWidth / imageSrc.width;
  const width = maxWidth;
  const height = Math.round(ratio * imageSrc.height);
  return {width, height};
}
