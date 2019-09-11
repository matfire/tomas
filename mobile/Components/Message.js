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

//const client = feathers();

//client.configure(socketio(host));
//client.authentication

export default class Contactes extends Component {

  constructor() {

    super();

  }

  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
     const {navigate} = this.props.navigation;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
 
const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
});