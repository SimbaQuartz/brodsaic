import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage
}from 'react-native';
    export default class WelcomePage extends React.Component{
        componentDidMount(){
            this._loadInitialState().done();
        }
        
        _loadInitialState=async()=>{
    
            // try {
            //     const value = await AsyncStorage.getItem('@MySuperStore:key');
            //     if (value !== null){
            //       // We have data!!
            //       console.log(value);
            //     }
            //   } catch (error) {
            //     // Error retrieving data
            //   }
    
            var user= await AsyncStorage.getItem('user');
            if(user!==null){
                
                this.props.navigation.navigate('Profile');
            }
            else{
                this.props.navigation.navigate('Login');
            }
        }
        render(){
            return(
                <View>
                <Text> Welcome SAIC </Text>
               
                </View>
            );
        }
        
}
