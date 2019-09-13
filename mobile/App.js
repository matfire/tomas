/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'

import { Provider } from 'react-redux'
import Store from './Store/ConfigStore'
import MainApp from './Components/MainApp'

export default class App extends React.Component {

  render() {
    return (
      <Provider store={Store}>
        <MainApp/>
      </Provider>
    )
  }
}