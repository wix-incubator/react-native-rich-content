import React, {useState, useCallback, useMemo} from 'react';
import {ViewProps, View, StyleSheet, LayoutChangeEvent} from 'react-native';
import { AtomicPlugin } from '@react-native-rich-content/common';
import { ActionSheet } from './ActionSheet';
import {ToolbarButton} from './ToolbarButton';
import { ToolbarItem } from './types';

const plusIcon = require('../assets/plus-icon.png');

export interface ToolbarProps {
    plugins: AtomicPlugin[];
    style?: ViewProps['style'];
    onLayout?: (event: LayoutChangeEvent) => void;
    shouldShowActionSheet?: boolean;
}

export const DefaultToolbar = ({style, onLayout, plugins, shouldShowActionSheet}: ToolbarProps) => {

    const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
    const openActionSheet = useCallback(() => setIsActionSheetVisible(true), []);
    const closeActionSheet = useCallback(() => setIsActionSheetVisible(false), []);

    const toolbarItems = useMemo(()=> {
        const pluginOrientedToolbarItems: ToolbarItem[] = plugins.map(plugin => ({icon: plugin.toolbarIcon, onPress: plugin.onPress}));
        const actionSheetOrientedToolbarItems: ToolbarItem[] = [{
            icon: plusIcon,
            onPress: openActionSheet
        }];
        return shouldShowActionSheet ?  actionSheetOrientedToolbarItems : pluginOrientedToolbarItems;
    }, [shouldShowActionSheet, plugins, openActionSheet]);

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