import React, { useMemo } from 'react';
import { View, ViewProps, TextProps } from 'react-native';
import { ViewerPlugin } from '@react-native-rich-content/common';
import { createRenderers } from '../draft-utils/create-renderers';
import { PreviewConfig } from '../preview';
import { getPreviewData } from '../preview/preview-utils';
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
  const renderers = useMemo(() => createRenderers(plugins, textStyle), [plugins, textStyle]);
  const previewData = previewConfig ? getPreviewData(previewConfig, content, plugins) : null;
  return (
    <View
      style={style}
    >
      { previewData
        ? (
          <Preview
            renderers={renderers}
            previewData={previewData}
          />
        )
        : (
          <DraftContent
            renderers={renderers}
            content={content}
          />
        )}
    </View>
  );
}
