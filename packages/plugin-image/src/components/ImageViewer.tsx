import React, {
  useCallback, useMemo, useRef, MutableRefObject, Component,
} from 'react';
import {
  Text,
  TextStyle,
  ImageSourcePropType,
  ImageProps,
  TouchableOpacityProps,
  ViewProps,
  Dimensions,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ImageData } from '../types';
import { getImageSize } from '../utils/size-utils';
import { getImageCaption, shouldEnableImageExpand, isImageLoading } from '../utils/draft-utils';
import { defaultSourceTransformer } from '../utils/source-transformer';

export interface ImageViewerProps {
  containerStyle?: TouchableOpacityProps['style'] & ViewProps['style'];
  captionStyle?: TextStyle;
  imageStyle?: ImageProps['style'];
  data: ImageData;
  LoaderComponent?: typeof Component;
  onPress?: (data: ImageData, containerRef?: MutableRefObject<null | typeof TouchableOpacity>['current'], imageRef?: MutableRefObject<null | typeof Image>['current']) => void;
  sourceTransformer?: (image: ImageData) => ImageSourcePropType;
  accessibilityLabel?: string;
  testID?: string;
}

const screenSize = Dimensions.get('window');

export function ImageViewer({
  data,
  onPress,
  containerStyle,
  captionStyle,
  imageStyle,
  LoaderComponent = View,
  sourceTransformer = defaultSourceTransformer,
  accessibilityLabel,
  testID,
}: ImageViewerProps) {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const imageSize = getImageSize(data.src || null, screenSize.width);

  const imageStyleWithSize = useMemo(() => ([
    imageStyle, { width: undefined, height: imageSize.height },
  ]), [imageStyle, imageSize.height]);

  const reffedOnPress = useCallback(() => {
    if (onPress) {
      onPress(data, containerRef.current, imageRef.current);
    }
  }, [onPress, containerRef, imageRef, data]);

  const source = useMemo(() => sourceTransformer(data), [data, sourceTransformer]);

  const caption = getImageCaption(data);
  const ContainerComponent = (shouldEnableImageExpand(data)
    ? TouchableOpacity : View) as typeof TouchableOpacity;
  const isLoading = isImageLoading(data);

  return (isLoading && LoaderComponent) ? (
    <LoaderComponent
      style={imageSize}
    />
  ) : (
    <ContainerComponent
      style={containerStyle}
      onPress={reffedOnPress}
      activeOpacity={0.85}
      ref={containerRef}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Image
        style={imageStyleWithSize}
        resizeMode="cover"
        ref={imageRef}
        source={source}
      />
      {!!caption && (
        <Text style={captionStyle}>
          {caption}
        </Text>
      )}
    </ContainerComponent>
  );
}
