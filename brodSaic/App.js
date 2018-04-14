import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  DrawerNavigator
} from 'react-navigation';
import Login from './app/components/Login/Login';
import Profile from './app/components/Login/Profile';
import SideMenu from './app/components/Screens/SideMenu';
import Broadcast from './app/components/Screens/Broadcast';

const Application = DrawerNavigator({
  Login: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },
  Broadcast:{
    screen: Broadcast
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