import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Home extends React.Component {
    static navigationOptions = {
      drawerLabel: 'Home',
      drawerIcon: ({ tintColor }) => (
        <Image
          source={require('../../../assets/icons/home-icon.png')}
          style={[styles.icon, {tintColor: tintColor}]}
        />
      ),
    };
  
    render() {
        return (
          <Button
            onPress={() => this.props.navigation.navigate('Notifications')}
            title="Go to notifications"
          />
        );
      }
  }
  const styles = StyleSheet.create({
    icon: {
      width: 24,
      height: 24,
    },
  });