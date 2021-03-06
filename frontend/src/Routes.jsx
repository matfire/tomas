import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Contacts from './pages/Contacts'
import Video from './pages/Video'
import Gallery from './pages/Gallery'



const Routes = ({authenticated}) => {
    if (authenticated) {
        return (
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/contacts" exact component={Contacts} />
                <Route path="/conf/:hash" component={Video} />
                <Route path="/gallery" component={Gallery} />
                <Redirect to="/" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Redirect to="/login" />
        </Switch>
    )
}


const mapStateToProps = state => (
    {
        authenticated:state.authenticated
    }
)


export default connect(mapStateToProps)(Routes)