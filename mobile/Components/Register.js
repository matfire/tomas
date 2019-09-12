import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import app from '../Config/Auth';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null};
  }

  _onRegister = () => {
    app.service('users').create({
      email: this.state.email,
      password: this.state.password,
      elder: false,
    }).then(() => {
      this.setState({isLogged: true});
      alert("Register ok");
    }).catch(e => {
      alert(e);
    }); 
  };

  render() {
    return (
        <View>
            <View style={styles.buttons}>
                <TextInput
                    onChangeText={(text) => this.setState({email: text})}
                    placeholder="Adresse mail"
                />
                <TextInput
                    onChangeText={(text) => this.setState({password: text})}
                    placeholder="Mot de passe"
                />
                <Button
                    style={styles.button}
                    onPress={this._onRegister}
                    title="S'enregistrer"
                />
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    justifyContent: 'space-around',
    padding: 20
  },
  button: {
    flex: 1,
    padding:20,
    margin:20
  },
});