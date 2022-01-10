import {useState, useCallback, useMemo} from 'react';
import { AtomicPlugin } from '@react-native-rich-content/common';
import { ToolbarItem } from './types';

const plusIcon = require('../assets/plus-icon.png');

export const useToolbar = (plugins: AtomicPlugin[], shouldShowActionSheet?: boolean) => {
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

    return {toolbarItems, closeActionSheet, isActionSheetVisible};
}