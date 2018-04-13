import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {StackNavigator} from 'react-navigation';

export default class Login extends React.Component {

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

        // try {
        //     const value = await AsyncStorage.getItem('@MySuperStore:key');
        //     if (value !== null){
        //       // We have data!!
        //       console.log(value);
        //     }
        //   } catch (error) {
        //     // Error retrieving data
        //   }

        var loginSuccess= await AsyncStorage.getItem('loginSuccess');
        if(loginSuccess){
            this.props.navigation.navigate('Profile');
        }
    }

    render() {
    return ( 
        <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>

            <View style={styles.container}>
                <Text style={styles.header}>BrodSaic</Text>
                <TextInput
                    style={styles.textInput} placeholder='Username'
                    onChangeText={(username)=>this.setState({username})}
                    underlineColorAndroid='transparent'
                />
                <TextInput
                    style={styles.textInput} placeholder='Password'
                    onChangeText={(password)=>this.setState({password})}
                    underlineColorAndroid='transparent'
                    secureTextEntry={true}
                />
            <TouchableOpacity
                style={styles.btn}
                onPress={this.login}>
                <Text>Let's Roll</Text>
            </TouchableOpacity>
            </View>
            

        </KeyboardAvoidingView>
    );
  }
    login=()=>{
        fetch('http://192.168.137.1:3000/users',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
                username:this.state.username,
                password:this.state.password,
            })
        }) //backend IP :')

        .then((response)=> response.json())
        .then((res)=>{
            if(res.success===true){
                AsyncStorage.setItem('user',this.state.username);
                AsyncStorage.setItem('userType',res.usertype);
                AsyncStorage.setItem('loginSuccess',true);
                AsyncStorage.setItem('nameOfUser',res.nameOfUser);
                this.props.navigation.navigate('Profile');
            }
            else{
                AsyncStorage.setItem('loginSuccess',false);
                alert(res.message);
            }
        })
        .done();
    }
}

const styles=StyleSheet.create({
    wrapper:{
        flex:1
    },
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff0f0',
        paddingLeft: 40,
        paddingRight: 40
    },
    header:{
        fontSize: 24,
        marginBottom:60,
        color:'#000000',
        fontWeight: 'bold',
    },
    textInput:{
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


})