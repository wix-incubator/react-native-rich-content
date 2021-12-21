import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

export interface ToolbarButtonProps {
    icon?: any;
    onPress?: () => void;
}

export const ToolbarButton = ({icon, onPress}: ToolbarButtonProps) => {

    return (
        <TouchableOpacity style={styles.touchable} onPress={onPress}>
            <Image source={icon}/>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    touchable: {
        width: 30,
        height: '100%',
        borderColor: 'grey',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

})