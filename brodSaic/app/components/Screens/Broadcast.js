import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, AsyncStorage, ScrollView, FlatList, Alert, ActivityIndicator, Platform} from 'react-native';
import {List,ListView,ListItem,SearchBar} from 'react-native-elements';
import {StackNavigator} from 'react-navigation';
var ips=require('./ip.json');

export default class Broadcast extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false
        }
    }
    componentDidMount(){
        
        this._loadInitialState().done();

        FlatListItemSeparator = () => {
            return (
              <View
                style={{
                  height: 1,
                  width: "100%",
                  backgroundColor: "#607D8B",
                }}
            />
            );
        }


    }
    _loadInitialState=async()=>{
        var user= await AsyncStorage.getItem('user');
        
        
        // if(user!==null){
            this.setState({
                username:user
            });
            // }
            try {
              var myArray = await AsyncStorage.getItem('userBroadcastList');
              if (myArray !== null) {
                // We have data!!
                console.log('Broadcast List is available in Async Storage\n'+myArray);

                this.setState({myBroadcastLists:JSON.parse(myArray)});
                console.log('**Passing the array to state**'+JSON.parse(myArray));
              } 
              
              else{
                console.log('Broadcast List not available in Async Storage');
                await this.broadcastList();
              }
            } catch (error) {
              console.log("Error retrieving data")
            }
            
       
    }

    handleRefresh = () => {
        this.setState(
          {
            page: 1,
            seed: this.state.seed + 1,
            refreshing: true
          },
          () => {
            this.broadcastList();
          }
        );
      };
    
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
        return <SearchBar placeholder="Type Here..." lightTheme round />;
      };
    
      renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };
      _onPressItem = (item) => { 
        console.log('running onpress function');
        this.props.navigation.navigate('Chatview',{
          id:item.id,
          brodcasterId:item.operator.id,
               //your user details
        })
     };

    render() {
      console.log('this.state.myBroadcastLists'+this.state.myBroadcastLists);
        return (
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.myBroadcastLists}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={()=>{this._onPressItem(item)}}>
                <ListItem
                  roundAvatar
                  title={`${item.name}`}
                  subtitle={item.operator.name}
                //   avatar={{ uri: item.picture.thumbnail }}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
                </TouchableOpacity>
              )}
            //   keyExtractor={item => item.email}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              ListFooterComponent={this.renderFooter}
              // onRefresh={this.handleRefresh}
              // refreshing={this.state.refreshing}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </List>
        );
      }
  
  broadcastList=async()=>{
        fetch(`${ips.usingip}/users/getBroadcastList?id=${this.state.username}`,{
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

                try {
                  AsyncStorage.setItem('userBroadcastList', JSON.stringify(res.userBroadcastList));
                  this.setState({myBroadcastLists:JSON.stringify(res.userBroadcastList)})
                } catch (error) {
                  console.log('Error saving data');
                }
                this.setState({
                    loading: false,
                    refreshing: false
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
      },
      MainContainer :{

        justifyContent: 'center',
        flex:1,
        margin: 10,
        paddingTop: (Platform.OS === 'ios') ? 20 : 0,
        
      },
        
        FlatListItemStyle: {
            padding: 10,
            fontSize: 18,
            height: 44,
          },
})