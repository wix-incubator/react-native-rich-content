import React, {useCallback} from 'react';
import {Modal, TouchableWithoutFeedback, View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import { ActionSheetButton } from './ActionSheetButton';
import { AtomicPlugin } from '@react-native-rich-content/common';

export interface ActionSheetProps {
    visible: boolean;
    onClose: () => void;
    plugins: AtomicPlugin[];
}

export const ActionSheet = ({visible, onClose, plugins}: ActionSheetProps) => {

    const keyExtractor = useCallback((_item, index) => index.toString(), []);
    const renderPluginSelector = useCallback(({item}: {item: AtomicPlugin}) => (
        <ActionSheetButton onClose={onClose} plugin={item}/>
    ), [onClose]);
    const renderSeparator = useCallback(() => <View style={styles.separator}/>, []);

    return (
        <Modal
            animationType='fade'
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
                <View style={styles.root}>
                    <TouchableWithoutFeedback style={styles.fullWidth} onPress={onClose}>
                        <View style={styles.fullWidth}/>
                    </TouchableWithoutFeedback>
                    <View
                        style={styles.container}
                    >
                        <Text style={styles.title}>Plugins</Text>
                <FlatList
                    style={styles.flatList}
                    showsVerticalScrollIndicator={false}
                    data={plugins}
                    extraData={plugins}
                    renderItem={renderPluginSelector}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={renderSeparator}
                    contentContainerStyle={styles.flatListContainer}
                />
                    </View>
                </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#000000AA',
        justifyContent: 'flex-end',
        width: '100%',
        height: '100%'
    },
    fullWidth: {
        flex: 1,
        width: '100%',
    },

    flatList: {
        marginBottom: 20,
    },
    flatListContainer: {
        paddingBottom: 40,
    },
    separator: {
        opacity: 0.1,
        backgroundColor: '#182E44',
        height: 1
    },
    container: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 10,
        maxHeight: Dimensions.get('screen').height * 0.4
    },
    title: {
        fontSize: 20,
        fontWeight: '500',
        margin: 15,
    }
});
