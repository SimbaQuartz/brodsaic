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
var tinp;
export default class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            loggedInUser: '',
            userType: ''
        }
    }

    componentDidMount(){
        this._loadInitialState().done();
    }
    
    _loadInitialState=async()=>{
        var value= await AsyncStorage.getItem('user');
        var usertype= await AsyncStorage.getItem('userType');
        this.setState({
            userType: usertype
          });
        if(value!==null){
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
        if(this.state.userType=="reciever"){
            tinp=<Text>Welcome buddy</Text>
        }
        if(this.state.userType=="broadcaster"){
            tinp=<TextInput
            style={styles.textInput} placeholder='Username'
            underlineColorAndroid='transparent'
        />;
        }
    return ( 
        
            <View style={styles.container}>
                <Text style={styles.text}>This is you profile dear {this.state.userType}</Text>
                {tinp}
            </View>
            
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