import React, {useCallback, useMemo, useRef, MutableRefObject, Component} from 'react';
import {TextStyle, ImageSourcePropType, ImageProps, TouchableOpacityProps, ViewProps, Dimensions, View, TouchableOpacity, Image} from 'react-native';
import {ImageData} from '../types';
import {getImageSize} from '../utils/size-utils';
import {getImageCaption, shouldEnableImageExpand, isImageLoading} from '../utils/draft-utils';
import {defaultSourceTransformer} from '../utils/source-transformer';
import {InlineSpoilerText, computeBlurForSize} from 'react-native-rich-content-spoiler';

export interface ImageViewerProps {
  containerStyle?: TouchableOpacityProps['style'] & ViewProps['style'];
  captionStyle?: TextStyle;
  imageStyle?: ImageProps['style'];
  image: ImageData;
  blur?: boolean;
  LoaderComponent: typeof Component;
  onPress: (containerRef?: MutableRefObject<null | typeof TouchableOpacity>['current'], imageRef?: MutableRefObject<null | typeof Image>['current']) => void;
  sourceTransformer?: (image: ImageData) => ImageSourcePropType;
  accessibilityLabel?: string;
  testID?: string;
}

const screenSize = Dimensions.get('window');

export const ImageViewer = ({
  image,
  onPress,
  containerStyle,
  captionStyle,
  imageStyle,
  LoaderComponent = View,
  sourceTransformer = defaultSourceTransformer,
  blur,
  accessibilityLabel,
  testID,
}: ImageViewerProps) => {
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const imageSize = getImageSize(image.src || null, screenSize.width);

  const imageStyleWithSize = useMemo(() => ([
    imageStyle, {width: undefined, height: imageSize.height},
  ]), [imageStyle, imageSize.height]);

  const reffedOnPress = useCallback(() => onPress(containerRef.current, imageRef.current), [onPress, containerRef, imageRef]);

  const source = useMemo(() => sourceTransformer(image), [image, sourceTransformer]);

  const caption = getImageCaption(image);
  const ContainerComponent = (shouldEnableImageExpand(image) ? TouchableOpacity : View) as typeof TouchableOpacity;
  const isLoading = isImageLoading(image);

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
        blurRadius={blur ? computeBlurForSize(imageSize) : 0}
        ref={imageRef}
        source={source}
      />
      {!!caption && (
        <InlineSpoilerText style={captionStyle} shouldHide={!!blur}>
          {caption}
        </InlineSpoilerText>
      )}
    </ContainerComponent>
  );
};
