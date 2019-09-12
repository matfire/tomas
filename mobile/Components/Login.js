import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import app from '../Config/Auth';
import {AsyncStorage} from 'react-native';

import { connect } from 'react-redux'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  _onLogin = () => {
    AsyncStorage.setItem("email", this.state.email);
    AsyncStorage.setItem("password", this.state.password);
    app.authenticate({
      strategy: 'local',
      email: this.state.email,
      password: this.state.password,
    }).then((data) => {
        AsyncStorage.setItem("user", data.user)
        const action = { type: "LOGIN" }
        this.props.dispatch(action)
      }).catch(e => {
        console.log(e);
      });
  };

  _onLogout = () => {
    app.logout().then(() => {
      const action = { type: "LOGOUT" }
      this.props.dispatch(action)
    }).catch(e => {
      console.log(e);
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
                  onPress={this._onLogin}
                  title="Se connecter"
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

export default connect()(Login)