import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import {
  DrawerNavigator
} from 'react-navigation';
import Login from './app/components/Login/Login';
import Profile from './app/components/Login/Profile';
import SideMenu from './app/components/Screens/SideMenu';
import Chatview from './app/components/Screens/Chatview';
import Broadcast from './app/components/Screens/Broadcast';
import WelcomePage from './app/components/Screens/WelcomePage';

const Application = DrawerNavigator({
  WelcomePage:{
    screen: WelcomePage
  },
  Profile: {
    screen: Profile
  },
  Login: {
    screen: Login
  },
  Broadcast:{
    screen: Broadcast
  },
  Chatview:{
    screen: Chatview
  },
  

}, {
  contentComponent: SideMenu,
  drawerWidth: 300
});

export default class App extends React.Component {
  render() {
    return ( <
      Application / >
    );
  }
}