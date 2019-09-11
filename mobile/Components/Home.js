import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, Alert, Separator, TouchableOpacity, Linking, PermissionsAndroid, Button, Image } from 'react-native'

export default class Home extends Component {
    
    constructor() {

        super();

    };
    render() {
      const {navigate} = this.props.navigation;
      return (
        <View style={styles.MainContainer}>
          <Text style={{ fontSize: 18}}>Scanner le QRCode</Text>

          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => navigate('QRScan')}>
            <Image
              source={require('../utils/qrcode.png')}
              style={styles.ImageIconStyle}  
            />
            <View style={styles.SeparatorLine} />
          </TouchableOpacity>
          {/* <Button 
            title='QRCode' 
            onPress={() => navigate('QRScan')}
          /> */}

          <Text style={{
            borderBottomColor: '#737373',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 250,
          }}></Text>

          <Text style={{ fontSize: 18}}>Répertoire</Text>
          
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5} onPress={() => navigate('Contactes')}>
            <Image
              source={require('../utils/phonebook.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
          </TouchableOpacity>

          <Text style={{
            borderBottomColor: '#737373',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 250,
          }}></Text>

          <Text style={{ fontSize: 18}}>Photo</Text>
          
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image
              source={require('../utils/photo.jpg')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
          </TouchableOpacity>

          <Text style={{
            borderBottomColor: '#737373',
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: 250,
          }}></Text>

          <Text style={{ fontSize: 18}}>Paramètres</Text>
          
          <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}>
            <Image
              source={require('../utils/parametres.png')}
              style={styles.ImageIconStyle}
            />
            <View style={styles.SeparatorLine} />
          </TouchableOpacity>

          {/* <Button title='Repertoire' disabled
            style={{ 
              flexDirection: 'row',
              justifyContent: 'space-between',
          }} /> */}
        </View>
      );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
      flex: 1,
      paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
      alignItems: 'center',
      //justifyContent: 'center',
    },
    QR_text: {
      color: '#000',
      fontSize: 19,
      padding: 8,
      marginTop: 12
    },
    ImageIconStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
    },
    button: {
      backgroundColor: '#2979FF',
      // alignItems: 'center',
      padding: 12,
      width: 300,
      marginTop: 14
    },
  });