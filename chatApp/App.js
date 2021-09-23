import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './Screens/WelcomeScreen';
import { myDarkTheme, myLightTheme } from './theme';
import LoginScreen from './Screens/LoginScreen';
import HomeScreen from './Screens/HomeScreen';
import LoginProfileDetailsScreen from './Screens/LoginProfileDetailsScreen';

const MainStack=createNativeStackNavigator();

export default function App() {
  const colorScheme=useColorScheme();
  return (
    <NavigationContainer theme={colorScheme==='dark'?myDarkTheme:myLightTheme}>
      <StatusBar/>
      <MainStack.Navigator initialRouteName='App'>
        <MainStack.Screen name='Welcome' component={WelcomeScreen}/>
        <MainStack.Screen name='Login' component={LoginScreen}/>
        <MainStack.Screen name='Profile Details' component={LoginProfileDetailsScreen}/>
        <MainStack.Screen name='App' component={HomeScreen} options={{headerShown:false}}/>
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
