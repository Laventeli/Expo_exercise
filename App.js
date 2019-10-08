import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MainScreen from './screens/MainScreen.js';
import HomeScreen from './screens/HomeScreen.js';
import CameraScreen from './screens/CameraScreen.js';
import GalleryScreen from './screens/GalleryScreen.js';

const AppNavigator = createStackNavigator(  // TODO use switch navigator (?)
  {
    Main: MainScreen,
    Home: HomeScreen,
    Camera: CameraScreen,
    Gallery: GalleryScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {
  render() {
    return <AppContainer />
  }
}
