import React from 'react';
import {StyleSheet} from 'react-native';
import {Viewer} from '@react-native-rich-content/viewer';
import {Content} from '@react-native-rich-content/common';
import {imageViewerPlugin} from '../plugins/image/viewer-plugin';
import {MediaPreview} from './MediaPreview';

const viewerPlugins = [imageViewerPlugin];

const previewConfig = {
  showMediaPreview: true,
  previewMaxContentBlocks: 2,
  previewWhenContentLengthExceeds: 2,
  previewMaxNumberOfBlocks: 2,
  MediaPreviewComponent: MediaPreview,
};

interface ConsumerViewerProps {
  content: Content;
}

export const ConsumerViewer = ({content}: ConsumerViewerProps) => {
  return (
    <Viewer
      plugins={viewerPlugins}
      content={content}
      style={styles.root}
      textStyle={styles.text}
      previewConfig={previewConfig}
    />
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 60,
    height: 500,
    width: '100%',
  },
  text: {
    fontFamily: 'BlackChancery',
  },
});
