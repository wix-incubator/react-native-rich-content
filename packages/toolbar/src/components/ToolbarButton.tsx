import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ToolbarItem} from './types';

interface ToolbarPluginButton {
  toolbarItem: ToolbarItem;
}

export const ToolbarButton = ({toolbarItem: {icon, onPress}}: ToolbarPluginButton) => {
  return (
    <TouchableOpacity style={styles.root} onPress={onPress}>
      <Image style={styles.image} source={icon} />
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
