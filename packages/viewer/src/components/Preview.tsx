import React from 'react';
import { View, ViewProps } from 'react-native';
import { Renderers } from '../draft-utils/create-renderers';
import { PreviewData } from '../preview';
import { DraftContent } from './DraftContent';

export interface PreviewProps {
    renderers: Renderers;
    previewData: PreviewData;
    style?: ViewProps['style'];
}

export function Preview({
  renderers, previewData, style,
}: PreviewProps) {
  const { truncatedContent, thumbnailRenderers, MediaPreviewComponent } = previewData;
  return (
    <View
      style={style}
    >
      <DraftContent renderers={renderers} content={truncatedContent} />
      {MediaPreviewComponent
      && <MediaPreviewComponent thumbnails={thumbnailRenderers} />}
    </View>
  );
}
