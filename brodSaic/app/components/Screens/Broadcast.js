import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
export default class Broadcast extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username: ''
        }
    }
    componentDidMount(){
        this._loadInitialState().done();
    }
    _loadInitialState=async()=>{
        var user= await AsyncStorage.getItem('user');
        console.log(user+'*********************')
        if(user!==null){
            this.setState({
                username:user
            });
        }
    }
    render() {
        this.broadcastList();
    return ( 
        <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
            <View style={styles.container}>
                <Text style={styles.header}>Broadcast Page</Text>
            </View>
        </KeyboardAvoidingView>
    );
  }
  broadcastList=()=>{
      console.log(this.state.username);
        fetch(`http://192.168.137.1:3000/users/getBroadcastList?id=401603018`,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body: JSON.stringify({
            })
        }) //backend IP :')
        .then((response)=> response.json())
        .then((res)=>{
            if(res.success===true){
                AsyncStorage.setItem('user',this.state.username);
                AsyncStorage.setItem('loginSuccess',true);
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