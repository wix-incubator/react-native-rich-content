import { Content } from '@react-native-rich-content/common';
import React from 'react';
import { View, ViewProps } from 'react-native';
import { Renderers } from '../draft-utils/create-renderers';
import { MediaPreviewComponentType, ThumbnailRenderer } from '../preview';
import { DraftContent } from './DraftContent';

export interface PreviewProps {
    renderers: Renderers;
    content: Content;
    MediaPreviewComponent?: MediaPreviewComponentType;
    thumbnailRenderers: ThumbnailRenderer[];
    style?: ViewProps['style'];
}

export function Preview({
  renderers, MediaPreviewComponent, thumbnailRenderers, content, style,
}: PreviewProps) {
  return (
    <View
      style={style}
    >
      <DraftContent renderers={renderers} content={content} />
      {MediaPreviewComponent
      && <MediaPreviewComponent thumbnails={thumbnailRenderers} />}
    </View>
  );
}
