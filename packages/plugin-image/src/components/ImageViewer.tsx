import React, {FC, useCallback, useMemo} from 'react';
import {Image, View, TouchableOpacity, ImageProps, TouchableOpacityProps} from 'react-native-ui-lib';
import {Dimensions, ViewStyle} from 'react-native';
import {getImageSize} from '../utils/image';
import {getUrlWithProtocol, openUrl} from '../utils/url';
import {InlineSpoilerText} from './InlineSpoilerText';
import {computeBlurForSize} from '../utils/spoiler-alert';

type ImageViewerProps = {
  style: ViewStyle;
  theme: Record<string, any>;
  image: string | {
    src: Object;
    config?: {
      link?: {
        url?: string
      };
    };
    loading?: boolean
  };
  withPreview: boolean;
  blur: boolean;
  LoaderComponent: FC<{height: number; width: number}>,
  expandHandler: () => void,
  onLinkOpened: () => void,
  imageProps: ImageProps;
  containerProps: TouchableOpacityProps;
  caption?: string;
}

const screenSize = Dimensions.get('window');

export default (props: ImageViewerProps) => {
  const {image, withPreview, onLinkOpened, expandHandler, theme, LoaderComponent, caption, imageProps, containerProps, blur} = props;
  const getImageLink = () => {
    const config = image.config;
    if (!config) {
      return null;
    }
    const url = config.link?.url || '';
    return getUrlWithProtocol(url);
  }

  const imageOnPress = useCallback(async () => {
    if (withPreview) {
      const linkUrl = getImageLink();
      if (linkUrl) {
        await openUrl(linkUrl);
        if (onLinkOpened) {
          onLinkOpened();
        }
      } else {
        expandHandler();
      }
    }
  }, [withPreview, onLinkOpened, expandHandler]);

  const imageSize = getImageSize(image.src || null, screenSize.width);
  const imageStyle = useMemo(() => ([
    {width: null, height: imageSize.height},
    theme.image
  ]), [image, theme, imageSize.height]);

    const ContainerComponent = image.disableExpand ? View : TouchableOpacity;
    const isLoading = image.loading;

    return (isLoading && LoaderComponent) ? (
    <LoaderComponent
      height={imageSize.height}
      width={imageSize.width}
    />
    ) : (
    <ContainerComponent
      style={theme.root}
      activeOpacity={0.85}
      {...containerProps}
      onPress={imageOnPress}
    >
      <Image
        style={imageStyle}
        resizeMode="cover"
        {...imageProps}
        blurRadius={blur ? computeBlurForSize(imageSize) : 0}
      />
      {!!caption && (
        <InlineSpoilerText style={theme.caption} shouldHide={blur}>
          {caption}
        </InlineSpoilerText>
      )}
    </ContainerComponent>
  );
}