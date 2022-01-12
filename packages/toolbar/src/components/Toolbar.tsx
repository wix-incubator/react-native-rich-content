import React from 'react';
import {ViewStyle, View, StyleSheet, LayoutChangeEvent} from 'react-native';
import {ToolbarButton} from './ToolbarButton';
import { ToolbarItem } from '../types';

export interface ToolbarProps {
    items: ToolbarItem[];
    style?: ViewStyle;
    onLayout?: (event: LayoutChangeEvent) => void;
}

export const Toolbar = ({style, onLayout, items}: ToolbarProps) => {

    const renderToolbarItems = (_toolbarItems: ToolbarItem[]) => _toolbarItems.map((item, index) => (
        <ToolbarButton key={index} toolbarItem={item}/>
    ));

    return (
        <View style={[styles.toolbar, style]} onLayout={onLayout}>
            {renderToolbarItems(items)}
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