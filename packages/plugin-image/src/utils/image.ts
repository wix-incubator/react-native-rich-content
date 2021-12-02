import {Dimensions} from 'react-native';
import {isObject} from 'lodash';

interface Image extends Size {};

const screenSize = Dimensions.get('window');

export const getFallbackImageSize: () => Size = () => {
  const screenSize = Dimensions.get('window');
  return {
    width: screenSize.width,
    height: screenSize.width * 0.5625,
  };
};

export function getImageSize(image: any, maxWidth: number) {
  if (!isObject(image)) {
    return getFallbackImageSize();
  }
  const typedImage = image as Image;
  const ratio = maxWidth / typedImage.width;
  const width = maxWidth;
  const height = Math.round(ratio * typedImage.height);
  return {width, height};
}

export const getOptimalHeight = (image: Image) => {
  const defaultRatio = 1.6;
  const ratio = image.height ? Math.max(defaultRatio, image.width / image.height) : defaultRatio;
  return Math.round(screenSize.width / ratio);
};
