import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            username: '',
            password: ''
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }
    
    _loadInitialState=async()=>{
        var value= await AsyncStorage.getItem('user');
        if(value!==null){
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
    return ( 
        <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

            <View style={styles.container}>
                <Text style={styles.text}>This is you profile BrodSaic</Text>
                
                <TouchableOpacity
                    style={styles.btn}
                    onPress={this.login}>
                    <Text>Let's Roll</Text>
                </TouchableOpacity>
            </View>
            

        </KeyboardAvoidingView>
    );
  }

}

const styles=StyleSheet.create({

    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff0f0',
        paddingLeft: 40,
        paddingRight: 40
    },
    text:{
        alignSelf: 'stretch',
        padding:16,
        marginBottom:20,
        backgroundColor:'#fff',
    },
    btn:{
        alignSelf: 'stretch',
        backgroundColor:'#f0f0ff',
        padding:20,
        alignItems: 'center',
    }

    
});