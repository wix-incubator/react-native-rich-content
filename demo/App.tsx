import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import EditorScreen from './src/screens/EditorScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const NavigationStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <NavigationStack.Navigator>
        <NavigationStack.Screen name='Home' component={HomeScreen}/>
        <NavigationStack.Screen name='Editor' component={EditorScreen}/>
      </NavigationStack.Navigator>
    </NavigationContainer>
  );
}