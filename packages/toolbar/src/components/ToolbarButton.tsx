import React from 'react';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ToolbarItem} from '../types';

interface ToolbarPluginButton {
  toolbarItem: ToolbarItem;
}

export const ToolbarButton = ({toolbarItem: {icon, onPress, isPressed}}: ToolbarPluginButton) => {
  
  return (
    <TouchableOpacity style={[styles.root, isPressed && styles.pressedButton]} onPress={onPress}>
      <Image style={styles.image} source={icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 40,
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
    width: '100%'
  },
  pressedButton: {
    backgroundColor: '#dbdbdb'
  }
});
