import {createStore} from 'redux'
import app from '../client'

let baseStore = {
    authenticated:false,
    client: app,
    lat:"",
    lon:"",
    user:{}
}

const baseReducer = (state = baseStore, action) => {
    let newState = {...state}
    switch(action.type) {
        case "SET_AUTH":
                newState.authenticated = action.payload
                return newState
        case "SET_COORDS":
                newState.lat = action.payload.lat
                newState.lon = action.payload.lon
                return newState
        case "SET_USER":
                newState.user = action.payload
                return newState
        default:
            return newState
    }
}

const store = createStore(baseReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store