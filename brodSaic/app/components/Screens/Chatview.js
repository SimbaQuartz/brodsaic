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
var admin = require("firebase-admin");
var exists;
var serviceAccount = require("../../../brodsaic-firebase-adminsdk-kh401-3a18a9964a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://brodsaic.firebaseio.com"
});

var tinp;

const { width, height } = Dimensions.get('window');
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const conversation = [
  {
    sent: true,
    msg: 'all cool!',
  },
  {
    sent: false,
    msg: 'Hey wassup?',
  },
];

const EachMsg = (props) => {
  if (props.sent === false) {
    return (
      <View style={styles.eachMsg}>
        <Image source={{ uri: props.image }}style={styles.userPic} />
        <View style={styles.msgBlock}>
          <Text style={styles.msgTxt}>{props.msg}</Text>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.rightMsg} >
      <View style={styles.rightBlock} >
        <Text style={styles.rightTxt}>{props.msg}</Text>
      </View>
      <Image source={require('../../../assets/icons/social_myspace_button_blue.png')} style={styles.userPic} />
    </View>
  );
};

class Chatview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: ds.cloneWithRows(conversation),
      msg: '',
    };
    this.send = this.send.bind(this);
    this.reply = this.reply.bind(this);
  }

  reply() {
    conversation.unshift({
      sent: false,
      msg:'Hi Buddy',
    });
    this.setState({
      dataSource: ds.cloneWithRows(conversation),
    });
  }

  send() {
    if (this.state.msg.length > 0) {
      conversation.unshift({
        sent: true,
        msg: this.state.msg,
      });
      this.setState({
        dataSource: ds.cloneWithRows(conversation),
        msg: '',
      });
      setTimeout(() => {
        this.reply();
      }, 2000);
    }
  }

  componentDidMount(){
    this._loadInitialState().done();}
    
  _loadInitialState=async()=>{
    var ate=await AsyncStorage.getItem('user')
    .then(req => JSON.parse(req))
    .then(json => this.setState({username:JSON.stringify(json)}));

}
  render() {
    return (
    <View>
      <Text>This is your message box</Text>
    </View>
    )
  }
}

export default Chatview;

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width,
    height,
  },
  header: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#075e54',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
  },
  chatTitle: {
    color: '#fff',
    fontWeight: '600',
    margin: 10,
    fontSize: 15,
  },
  chatImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 5,
  },
  input: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 10,
    height: 40,
    width: width - 20,
    backgroundColor: '#fff',
    margin: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  eachMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
  },
  rightMsg: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    margin: 5,
    alignSelf: 'flex-end',
  },
  userPic: {
    height: 40,
    width: 40,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
  },
  msgBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  rightBlock: {
    width: 220,
    borderRadius: 5,
    backgroundColor: '#97c163',
    padding: 10,
    shadowColor: '#3d3d3d',
    shadowRadius: 2,
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 1,
    },
  },
  msgTxt: {
    fontSize: 15,
    color: '#555',
    fontWeight: '600',
  },
  rightTxt: {
    fontSize: 15,
    color: '#202020',
    fontWeight: '600',
  },
});