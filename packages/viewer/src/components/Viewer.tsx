import React, { useMemo } from 'react';
import {
  View, ViewProps, TextProps, Text,
} from 'react-native';
import { ViewerPlugin } from '@react-native-rich-content/common';
import { createRenderers } from '../draft-utils/create-renderers';
import { PreviewConfig, usePreview } from '../preview';
import { DraftContent } from './DraftContent';
import { Preview } from './Preview';

export interface ViewerProps {
    plugins: ViewerPlugin<any>[]; // TODO declare it better
    content: {
        blocks: Object;
        entityMap: Object;
    },
    style?: ViewProps['style'];
    textStyle?: TextProps['style'];
    previewConfig?: PreviewConfig;
}

export function Viewer({
  plugins, content, style, textStyle, previewConfig,
}: ViewerProps) {
  const {
    possiblyTruncatedContent, shouldShowPreview, expandOrCollapseButton, thumbnailRenderers,
  } = usePreview(content, plugins, previewConfig);
  const renderers = useMemo(() => createRenderers(plugins, textStyle), [plugins, textStyle]);
  return (
    <View
      style={style}
    >
      { shouldShowPreview
        ? (
          <Preview
            renderers={renderers}
            content={possiblyTruncatedContent}
            thumbnailRenderers={thumbnailRenderers}
            MediaPreviewComponent={previewConfig?.MediaPreviewComponent}
          />
        )
        : (
          <DraftContent
            renderers={renderers}
            content={possiblyTruncatedContent}
          />
        )}
      {expandOrCollapseButton
        && (
        <Text
          onPress={expandOrCollapseButton.onPress}
        >
          {expandOrCollapseButton.text}
        </Text>
        )}
    </View>
  );
}
