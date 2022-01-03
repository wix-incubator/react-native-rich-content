import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {AtomicPlugin} from '@react-native-rich-content/common';

interface ToolbarPluginButtonProps {
    plugin: AtomicPlugin;
}

export const ToolbarPluginButton = ({plugin}: ToolbarPluginButtonProps) => {
  return (
    <TouchableOpacity style={styles.root} onPress={plugin.onPress}>
      <Image style={styles.image} source={plugin.toolbarIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 30,
    height: '100%',
    borderColor: 'grey',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
});
