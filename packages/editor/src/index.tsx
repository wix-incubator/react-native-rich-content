import * as React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

export const Editor = (props: any) => {
    return (
        <View>
            <Text>Hello to Yuval</Text>
            <WebView source={{uri: 'https://www.wix.com'}} style={{flex: 0, width: 200, height: 200}}/>
        </View>
    )
}