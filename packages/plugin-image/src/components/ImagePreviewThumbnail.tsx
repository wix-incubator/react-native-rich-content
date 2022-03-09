import React, { useMemo } from 'react';
import {
  ImageSourcePropType, Image, ImageStyle, StyleProp,
} from 'react-native';
import { ImageData } from '../types';
import { defaultSourceTransformer } from '../utils/source-transformer';

export interface ImagePreviewThumbnailProps {
    data: ImageData;
    style?: StyleProp<ImageStyle>;
    sourceTransformer?: (image: ImageData) => ImageSourcePropType;
}

// eslint-disable-next-line react/function-component-definition
export const ImagePreviewThumbnail = ({
  data,
  style,
  sourceTransformer = defaultSourceTransformer,
}: ImagePreviewThumbnailProps) => {
  const source = useMemo(() => sourceTransformer(data), [data, sourceTransformer]);
  return (
    <Image
      source={source}
      style={style}
      resizeMode="cover"
    />
  );
};
