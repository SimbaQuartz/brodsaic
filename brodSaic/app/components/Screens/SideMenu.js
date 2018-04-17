import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import {ScrollView,StyleSheet, Text, View,AsyncStorage,TouchableOpacity} from 'react-native';

class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }
  logoutNavigateToScreen = (route) => () => {
    AsyncStorage.removeItem('user',null);
    AsyncStorage.removeItem('userBroadcastList',null);
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  logout = () => {
    AsyncStorage.setItem('user',null);
    this.navigateToScreen('Login');
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              BrodSaic
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Profile')}>
              Profile
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Navigate
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Broadcast')}>
                Broadcasts
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('NotificationScreen')}>
                Notifications
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
            <TouchableOpacity
                onPress={this.logoutNavigateToScreen('Login')}>
                <Text>ROLL OUT</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({

  container: {
    paddingTop: 20,
    flex: 1
  },
  navItemStyle: {
    padding: 10
  },
  navSectionStyle: {
    backgroundColor: 'lightgrey'
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'


  }
})

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;