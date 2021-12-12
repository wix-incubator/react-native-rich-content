import React from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {RootStackParamList} from './RootStackParamList';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

interface HomeScreenProps {}

type HomeScreenType = HomeScreenProps & NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenType> = (props) => {
    const {navigation} = props;

    return (  
    <View style={styles.container}>
        <Text>Welcome to the Rich Content demo app</Text>
        <Pressable onPress={() => navigation.navigate('Editor')}>
          <Text>Open Editor</Text>
        </Pressable>
      </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
  