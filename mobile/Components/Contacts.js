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
import {AsyncStorage} from 'react-native';

export default class Contactes extends Component {

  state = {
    user:{}
  }
  componentDidMount() {
    AsyncStorage.getItem("user", (err, result) => {
      if (err) console.error(err)
        this.setState({user:JSON.parse(result)}, () => console.log(this.state.user));
    });
  }
  render() {
     const {navigate} = this.props.navigation;
    return (
      <ScrollView contentContainerStyle={styles.stage}>
          <View
            style={{
              backgroundColor: '#37474F',
              height: 150,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 50}}>
            {this.state.user.email}
            </Text>
          </View>
          
        <TableView>
          <Section>
          {this.state.user.contacts && this.state.user.contacts.map(contact => (
            <Cell
              cellStyle="Subtitle"
              onPress={() => navigate('Message', {user:this.state.user})}
              cellContentView={
                <Text style={{ flex: 1, fontSize: 20 }}> { contact.email }{"\n"}
                </Text>
              }
            />
            ))}
            </Section>
        </TableView>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
});