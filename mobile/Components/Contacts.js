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

//const client = feathers();

//client.configure(socketio(host));
//client.authentication

export default class Contactes extends Component {

  constructor() {

    super();

  }

  render() {
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
              Roberto
            </Text>
          </View>
          
        <TableView>
          <Section>
            <Cell
              cellStyle="Subtitle"
              cellContentView={
                <Text style={{ flex: 1, fontSize: 40 }}> Petit fils {"\n"}
                <Text style={{ flex: 1, fontSize: 20 }}>  09238749
                </Text>
                </Text>
              }
            />
            </Section>
            <Section>
            <Cell
              cellStyle="Subtitle"
              cellContentView={
                <Text style={{ flex: 1, fontSize: 40 }}> Petite fille {"\n"}
                <Text style={{ flex: 1, fontSize: 20 }}>  09238749
                </Text>
                </Text>
              }
            />
            </Section>
            <Section>
            <Cell
              cellStyle="Subtitle"
              cellContentView={
                <Text style={{ flex: 1, fontSize: 40 }}> Femme {"\n"}
                <Text style={{ flex: 1, fontSize: 20 }}>  09238749
                </Text>
                </Text>
              }
            />
            </Section>
            <Section>
            <Cell
              cellStyle="Subtitle"
              cellContentView={
                <Text style={{ flex: 1, fontSize: 40 }}> Fille {"\n"}
                <Text style={{ flex: 1, fontSize: 20 }}>  09238749
                </Text>
                </Text>
              }
            />
            </Section>
            <Section>
            <Cell
              cellStyle="Subtitle"
              cellContentView={
                <Text style={{ flex: 1, fontSize: 40 }}> Fils {"\n"}
                <Text style={{ flex: 1, fontSize: 20 }}>  09238749
                </Text>
                </Text>
              }
            />
            </Section>
          
        </TableView>
      </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  head: { height: 40, backgroundColor: '#f1f8ff' },
});