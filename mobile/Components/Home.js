import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Alert, Separator, TouchableOpacity, Linking, PermissionsAndroid, Button } from 'react-native'

export default class Home extends Component {
    
    constructor() {

        super();

    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.MainContainer}>
          <Text style={{ fontSize: 22, textAlign: 'center'}}>Ici le menu Home</Text>

          <Button 
            title='QRCode' 
            onPress={() => navigate('QRScan')}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
      flex: 1,
      paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    QR_text: {
      color: '#000',
      fontSize: 19,
      padding: 8,
      marginTop: 12
    },
    button: {
      backgroundColor: '#2979FF',
      alignItems: 'center',
      padding: 12,
      width: 300,
      marginTop: 14
    },
  });