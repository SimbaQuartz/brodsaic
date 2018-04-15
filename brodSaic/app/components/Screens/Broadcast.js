import React from 'react';
import {StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard, TouchableOpacity, AsyncStorage, ScrollView, FlatList, Alert, ActivityIndicator, Platform} from 'react-native';
import {List,ListView,ListItem,SearchBar} from 'react-native-elements';
import {StackNavigator} from 'react-navigation';
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
        this.broadcastList();

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
    
      handleLoadMore = () => {
        this.setState(
          {
            page: this.state.page + 1
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
    

    render() {
        return (
          <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
            <FlatList
              data={this.state.myBroadcastLists}
              renderItem={({ item }) => (
                <ListItem
                  roundAvatar
                  title={`${item.name}`}
                  subtitle={item.operator.name}
                //   avatar={{ uri: item.picture.thumbnail }}
                  containerStyle={{ borderBottomWidth: 0 }}
                />
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
          </List>
        );
      }
  
  broadcastList=()=>{
      
        fetch(`https://brodsaic.herokuapp.com/users/getBroadcastList?id=${this.state.username}`,{
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
                AsyncStorage.setItem('myBroadcastLists',res.userBroadcastList);
                var obj = res.userBroadcastList;
                console.log((obj));
                this.setState({
                    myBroadcastLists:obj,
                    isLoading: false
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