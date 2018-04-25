import React from 'react';
import {
  View,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  AsyncStorage,
  FlatList
} from 'react-native';
import {List,ListView,ListItem,SearchBar} from 'react-native-elements';
var tinp=<View></View>;
var tbtn=<View></View>;
var ips=require('./ip.json');

export default class Chatview extends React.Component {

  

  constructor(props){
    super(props);
    this.state ={
      username: '',
      message: {},
      messages:[],  
      broadcastId:'',
      senderId:'',
      refreshing: false
    }
    console.log(this.props.navigation.state.params.id+'****************************************************BroadcastId');
  }
  componentDidMount=async()=>{
    var value= await AsyncStorage.getItem('user');
    var usertype= await AsyncStorage.getItem('userType');
    var nameOfUser= await AsyncStorage.getItem('nameOfUser');
    var { params } = this.props.navigation.state;
    var broadcastId = params ? params.id : null;
    var brodcasterId = params ? params.brodcasterId : null;
    console.log(brodcasterId+'**************************************'+broadcastId);
    await this.setState({
      username: value,
      broadcastId:JSON.stringify(broadcastId),
      brodcasterId:JSON.stringify(brodcasterId)
    });
    console.log(this.state.brodcasterId+'**************************************'+this.state.broadcastId);
    if(value===null){
      this.props.navigation.navigate('Login');
    }
  
    // try{
    //   let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
    // } catch(e){
    //   console.error(e);
    // }

  }

  sendMessage=async()=>{
    fetch(`${ips.usingip}/users/messages/?id=${this.state.broadcastId}`,{
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        username:this.state.senderId,
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
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };
  renderHeader = () => {
    return <TouchableOpacity
    style={styles.btn}
    onPress={this.recieveMessage.bind(this)}>
    <Text>Recieve Broadcasts</Text>
  </TouchableOpacity>;
  };
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.recieveMessage();
      }
    );
  };

  recieveMessage=()=>{
    fetch(`${ips.usingip}/users/getMessages?id=${this.state.username}&bid=${this.state.broadcastId}`,{
      method:'GET',
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
      }
  }) //backend IP :')
  .then((response)=> response.json())
  .then((res)=>{

          AsyncStorage.setItem('user',this.state.username);
          try {
            console.log(JSON.stringify(res)+'****************************************************///////////*/*/*/');
            var message={};
            AsyncStorage.setItem(this.state.broadcastId+'messages', res.messages);
            this.setState({
              messages:res.messages
            })
            
          } catch (error) {
            console.log('Error saving data');
          }
          this.setState({
              loading: false,
              refreshing: false
          });
  
          
  })
  .done();
  }
  render(){
    console.log(JSON.stringify(this.state.username)+'                                                              '+this.state.brodcasterId)
    if(JSON.stringify(this.state.username)===this.state.brodcasterId){
      tinp= <TextInput
      style={styles.textInput} placeholder='Enter your Message'
      onChangeText={(message)=>this.setState({message})}
      underlineColorAndroid='transparent'
      maxLength = {500}
      />
    tbtn=<TouchableOpacity
      style={styles.btn}
      onPress={this.sendMessage.bind(this)}>
      <Text>Send Broadcast</Text>
    </TouchableOpacity>
  }
  if(this.state.userType=="broadcaster"){
      tinp=<TextInput
      style={styles.textInput} placeholder='Username'
      underlineColorAndroid='transparent'
  />;
  }
    return(
      <View>
        <FlatList
              data={this.state.messages}
              renderItem={({ item }) => (
                // <TouchableOpacity onPress={()=>{this._onPressItem(item).bind(this)}}>
                <ListItem
                  roundAvatar
                  title={`${item.message}`}
                  // subtitle={item.operator.name}
                //   avatar={{ uri: item.picture.thumbnail }}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
                // </TouchableOpacity>
              )}
            //   keyExtractor={item => item.email}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              onRefresh={this.handleRefresh}
              refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          {tinp}{tbtn}
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