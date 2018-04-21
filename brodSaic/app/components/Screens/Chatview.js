import React from 'react';
import {
  View,
  ListView,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FCM, { FCMEvent,
  NotificationType,
  WillPresentNotificationResult,
  RemoteNotificationResult } from 'react-native-fcm';
  
export default class Chatview extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      username: '',
      message: {},
      messages:[]
    }
    console.log(JSON.stringify(this.props.navigation.state.params.id)+'****************************************************');
  }
  componentDidMount=async()=>{
    var value= await AsyncStorage.getItem('user');
    var usertype= await AsyncStorage.getItem('userType');
    var nameOfUser= await AsyncStorage.getItem('nameOfUser');
    this.setState({
      username: value
    });
    if(value===null){
      this.props.navigation.navigate('Login');
    }
  }

  sendMessage(){
    fetch(`localhost:3000/users/messages/?id=${JSON.stringify(this.props.navigation.state.params.id)}`,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        username:this.props.navigation.state.params.user,
        message:this.state.message,
      })
    }) //backend IP :')
    
    .then((response)=> response.json())
    .then((res)=>{
      if(res.success===true){
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
  render(){
    return(
      <View>
        <TextInput
          style={styles.textInput} placeholder='Enter your Message'
          onChangeText={(message)=>this.setState({message})}
          underlineColorAndroid='transparent'
          maxLength = {500}
          />
        <TouchableOpacity
          style={styles.btn}
          onPress={this.sendMessage}>
          <Text>Send Broadcast</Text>
        </TouchableOpacity>
      </View>
    )
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
    padding:2,
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