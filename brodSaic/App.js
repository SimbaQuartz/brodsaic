import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  StackNavigator
} from 'react-navigation';
import Login from './app/components/Login/Login';
import Profile from './app/components/Login/Profile';

const Application = StackNavigator({
  Home: {
    screen: Login
  },
  Profile: {
    screen: Profile
  },

}, {
  navigationOptions: {
    header: false,
  } 


});

export default class App extends React.Component {
  render() {
    return ( <
      Application / >
    );
  }
}