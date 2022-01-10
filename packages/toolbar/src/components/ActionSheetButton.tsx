import React, { useCallback } from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import { AtomicPlugin } from '@react-native-rich-content/common';

export interface ActionSheetButtonProps {
    plugin: AtomicPlugin;
    onClose: () => void;
}

export const ActionSheetButton = ({plugin, onClose}: ActionSheetButtonProps) => {
    const {ctaText, onPress} = plugin;
    const onButtonPress = useCallback(() => {
        onPress();
        onClose();
    }, [onPress, onClose]);
    return (
        <TouchableOpacity onPress={onButtonPress} style={styles.flatListItem}>
            <Text style={styles.ctaText}>{ctaText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    flatListItem: {
        flex: 1,
        height: 50,
        alignItems: 'center'
    },
    ctaText: {
        fontSize: 18
    }, 
});