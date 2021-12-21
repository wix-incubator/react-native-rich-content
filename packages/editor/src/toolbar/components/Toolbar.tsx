import React from 'react';
import {ViewProps, View, StyleSheet, LayoutChangeEvent} from 'react-native';
import {ToolbarItem} from '../types';

export interface ToolbarProps {
    toolbarItems: ToolbarItem[];
    style?: ViewProps['style'];
    onLayout?: (event: LayoutChangeEvent) => void;
    
}

export const Toolbar = ({toolbarItems, style, onLayout}: ToolbarProps) => {

    const renderToolbarItems = () => toolbarItems.map((toolbarItem, index) => {
        const Component = toolbarItem.component;
        return <Component key={index}/>;
    });

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