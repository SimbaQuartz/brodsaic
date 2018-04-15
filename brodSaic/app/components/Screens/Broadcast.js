import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, AsyncStorage,ScrollView,FlatList} from 'react-native';
import {List,ListView} from 'react-native-elements';
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
        
        
        // if(user!==null){
            this.setState({
                username:user
            });
            // }
            console.log(this.state.username+'--*********************');
        this.broadcastList();
            
    }
    render() {
        function listCreator(a){
            var b;
            for(i=0;i<a.length;i++){

            }
        }
    return ( 
        <Text>{JSON.stringify(this.state.myBroadcastLists)}</Text>
    );
  }
  
  broadcastList=()=>{
      console.log(this.state.username+'////////////////////////////////////////////////////');
        fetch(`http://brodsaic.herokuapp.com/users/getBroadcastList?id=${this.state.username}`,{
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
                console.log((res.userBroadcastList));
                AsyncStorage.setItem('myBroadcastLists',res.userBroadcastList);
                this.setState({
                    myBroadcastLists:res.userBroadcastList
                });
            }
            else{
                AsyncStorage.setItem('loginSuccess',false);
                alert("Failed fetching Your broadcast Lists");
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