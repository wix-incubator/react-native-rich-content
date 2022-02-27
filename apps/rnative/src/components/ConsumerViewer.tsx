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
  <Viewer
    plugins={viewerPlugins}
    content={content}
    style={styles.root}
    textStyle={styles.text}
  />
);

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
