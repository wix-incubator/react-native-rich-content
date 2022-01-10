import React, {useState, useCallback, useMemo} from 'react';
import {ViewProps, View, StyleSheet, LayoutChangeEvent} from 'react-native';
import { AtomicPlugin } from '@react-native-rich-content/common';
import { ActionSheet } from './ActionSheet';
import { useToolbar } from './useToolbar';
import {ToolbarButton} from './ToolbarButton';
import { ToolbarItem } from './types';

export interface ToolbarProps {
    plugins: AtomicPlugin[];
    style?: ViewProps['style'];
    onLayout?: (event: LayoutChangeEvent) => void;
    shouldShowActionSheet?: boolean;
}

export const Toolbar = ({style, onLayout, plugins, shouldShowActionSheet}: ToolbarProps) => {

    const {toolbarItems, closeActionSheet, isActionSheetVisible} = useToolbar(plugins, shouldShowActionSheet);

    const renderToolbarItems = (_toolbarItems: ToolbarItem[]) => _toolbarItems.map((item, index) => (
        <ToolbarButton key={index} toolbarItem={item}/>
    ));

    return (
        <View style={[styles.toolbar, style]} onLayout={onLayout}>
            {renderToolbarItems(toolbarItems)}
            <ActionSheet visible={isActionSheetVisible} onClose={closeActionSheet} plugins={plugins}/>
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