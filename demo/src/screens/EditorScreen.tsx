import React from 'react';
import {View, Text, StyleSheet} from 'react-native';


const EditorScreen: React.FC<{}> = (props) => {
    return (
        <View style={styles.container}>
            <Text>Editor Screen!</Text>
        </View>
    )
}

export default EditorScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#598ae6',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
