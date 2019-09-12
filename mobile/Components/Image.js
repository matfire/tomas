/*This is an example of Image Picker in React Native*/
import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

// import UpImage from '../Config/UploadImage'

import RNFetchBlob from 'react-native-fetch-blob';
import firebase from './Firebase';
import shortid from 'shortid';
import app from '../Config/Auth';


const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

export default class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
    };
  }

  storeReference = (downloadURL, sessionId, name) => {
    let image = {
      type: 'image',
      url: downloadURL,
      createdAt: sessionId,
    }
    console.log("upload store reference")
        app.service("images").create({
          path:downloadURL,
          name
        })
  }

  uploadImage = (uri, mime = 'application/octet-stream') => {
      console.log("testok");
      return new Promise((resolve, reject) => {
        console.log("uploadImage")
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const sessionId = new Date().getTime()
        let uploadBlob = null
        let name = shortid.generate()
        const imageRef = firebase.storage().ref('images').child(name)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          console.log("first")
          return Blob.build(data, { type: '${mime};BASE64' })
        })
        .then((blob) => {
          console.log("second")
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          console.log("third")
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          console.log("fourth")
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
        console.log("pass upload");
        this.uploadImage(response.uri);
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          filePath: source,
        });
      }
    });
    console.log("imagepicker");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/*<Image 
          source={{ uri: this.state.filePath.path}} 
          style={{width: 100, height: 100}} />*/}
          <Image
            source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}
          />
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 250, height: 250 }}
          />
          <Text style={{ alignItems: 'center' }}>
            {this.state.filePath.uri}
          </Text>
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