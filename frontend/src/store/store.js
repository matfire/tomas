import {createStore} from 'redux'
import app from '../client'
import firebase from '../firebase'

let baseStore = {
    authenticated:false,
    client: app,
    firebase:firebase,
    lat:"",
    lon:"",
    user:{},
    messages: [],
    selectedSender: "",
    images: []
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
        case "SET_MESSAGES":
                console.log("updated images with ", action.payload)
                newState.messages = action.payload
                return newState
        case "SET_SENDER":
                newState.selectedSender = action.payload
                return newState
        case "SET_IMAGES":
                newState.images = action.payload
                return newState
        default:
            return newState
    }
}

const store = createStore(baseReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store