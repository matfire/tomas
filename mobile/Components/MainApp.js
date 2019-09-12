import React from 'react'
import AuthNavigate from '../Navigate/AuthNavigate'
import HomeNavigate from '../Navigate/Navigate'
import app from '../Config/Auth'
import { connect } from 'react-redux'
import {AsyncStorage} from 'react-native';

class MainApp extends React.Component {

    componentWillMount() {
      app.authenticate().then(({user}) => {
        if (!this.props.auth) {
            AsyncStorage.setItem("user", JSON.stringify(user))
            const action = { type: "LOGIN" }
            this.props.dispatch(action)
        }
      }).catch((e) => {
        if (this.props.auth) {
            const action = { type: "LOGOUT" }
            this.props.dispatch(action)
        }
      });
    }

    render() {
      return (
        !this.props.auth ? <AuthNavigate/> : <HomeNavigate/>
      )
    }
  }


const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps)(MainApp)
