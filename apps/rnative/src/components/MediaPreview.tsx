import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ThumbnailRenderer} from '@react-native-rich-content/viewer';

interface MediaPreviewProps {
  thumbnails: ThumbnailRenderer[];
}

export const MediaPreview = ({thumbnails}: MediaPreviewProps) => {
  const FirstThumbnail = thumbnails[0];
  const SecondThumbnail = thumbnails[1];

  return (
    <View>
      {FirstThumbnail && <FirstThumbnail style={styles.first} />}
      {SecondThumbnail && <SecondThumbnail style={styles.second} />}
    </View>
  );
};

const styles = StyleSheet.create({
  first: {
    width: 100,
    height: 100,
  },
  second: {
    width: 70,
    height: 70,
  },
});
