import React from 'react';
import {StyleSheet} from 'react-native';
import {Viewer} from '@react-native-rich-content/viewer';
import {Content} from '@react-native-rich-content/common';
import {imageViewerPlugin} from '../plugins/image/viewer-plugin';

const viewerPlugins = [imageViewerPlugin];

interface ConsumerViewerProps {
  content: Content;
}

export const ConsumerViewer = ({content}: ConsumerViewerProps) => (
  <Viewer plugins={viewerPlugins} content={content} style={styles.viewer} />
);

const styles = StyleSheet.create({
  viewer: {
    marginBottom: 60,
    height: 500,
    width: '100%',
  },
});
