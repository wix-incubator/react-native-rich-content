import { AtomicPlugin } from '@react-native-rich-content/common';
import React from 'react';
import {ViewProps, View, StyleSheet, LayoutChangeEvent} from 'react-native';
import {ToolbarPluginButton} from './ToolbarPluginButton';

export interface ToolbarProps {
    plugins: AtomicPlugin[];
    style?: ViewProps['style'];
    onLayout?: (event: LayoutChangeEvent) => void;
}

export const Toolbar = ({style, onLayout, plugins}: ToolbarProps) => {

    const renderToolbarItems = () => plugins.map((plugin, index) => (
         <ToolbarPluginButton key={index} plugin={plugin}/>
    ));

    return (
        <View style={[styles.toolbar, style]} onLayout={onLayout}>
            {renderToolbarItems()}
        </View>
    );
}

const styles = StyleSheet.create({
    toolbar: {
        width: '100%',
        height: 30,
        backgroundColor: 'white',
        borderTopColor: 'grey',
        borderTopWidth: 0.5,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        flexDirection: 'row',
    },
})