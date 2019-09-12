import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import io from 'socket.io-client';
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../Components/Firebase';
import {connect} from 'react-redux'

class Contactes extends Component {


  componentDidMount() {

  }

  onSend(message, user) {
    console.log(message)
    this.props.firebase.firestore().collection("messages").add({
      text:message[0].text,
      name:user.email,
      timestamp: new Date()
    }).then(() => {
    })
    // this.setState(previousState => ({
    //   messages: GiftedChat.append(previousState.messages, messages),
    // }))
  }

  render() {
     const {navigate} = this.props.navigation;
     let user = this.props.navigation.getParam("user", {})
     console.log(user)
    return (
       <GiftedChat
        messages={this.props.messages}
        onSend={messages => this.onSend(messages, user)}
        user={{
          _id: user.email,
        }}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
});

const mapStateToProps = state => (
{
  messages: state.messages,
  firebase: state.firebase
})

export default connect(mapStateToProps)(Contactes)