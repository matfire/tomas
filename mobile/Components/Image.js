/*This is an example of Image Picker in React Native*/
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import RNFetchBlob from 'react-native-fetch-blob';
import firebase from './Firebase';
import shortid from 'shortid';
import app from '../Config/Auth';

export default class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
    this.Blob = RNFetchBlob.polyfill.Blob;
    this.fs = RNFetchBlob.fs
  }

  componentDidMount() {
    const Blob = RNFetchBlob.polyfill.Blob;
    const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    window.Blob = Blob;
  }

  storeReference = (downloadURL, sessionId, name) => {
    let image = {
      type: 'image',
      url: downloadURL,
      createdAt: sessionId,
    }
    app.service("images").create({
      path:downloadURL,
      name
    }).then(() => {
      alert("Photo envoyée avec succès");
    }).catch(() => {
      alert("La photo n'a pas pu être envoyée")
    })
  }

  uploadImage = (uri, mime = 'application/octet-stream') => {
      return new Promise((resolve, reject) => {
        console.log("uploadImage")
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        let name = shortid.generate()
        const imageRef = firebase.storage().ref('images').child(name)
        this.fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return this.Blob.build(data, { type: '${mime};BASE64' })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
          this.storeReference(url, sessionId, name)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
      })
  }

  chooseFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      // console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.uploadImage(response.uri);
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button title="Choose File" onPress={this.chooseFile.bind(this)} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});