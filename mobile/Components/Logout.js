import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

import app from '../Config/Auth';

import { connect } from 'react-redux'

class Logout extends Component {
  _onLogout = () => {
    app.logout().then(() => {
      const action = { type: "LOGOUT" }
      this.props.dispatch(action)
    }).catch(e => {
      alert("Une erreur est survenue");
      console.log(e);
    });
  };

  render() {
    return (
      <View>
          <View style={styles.buttons}>
              <Button
                  style={styles.button}
                  onPress={this._onLogout}
                  title="Se déconnecter"
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

export default connect()(Logout)