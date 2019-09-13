import * as firebase from 'firebase'
import 'firebase/storage'
import store from './store/store'
import actions from './store/actions'


const app = firebase.initializeApp({
	apiKey: "AIzaSyCqB4GHvjCHQsPaRQRJrf29_OHmzwpM_WI",
    authDomain: "tomas-9a671.firebaseapp.com",
    databaseURL: "https://tomas-9a671.firebaseio.com",
    projectId: "tomas-9a671",
    storageBucket: "gs://tomas-9a671.appspot.com",
    messagingSenderId: "321268051130",
    appId: "1:321268051130:web:a9c860c1ef0507403f2683"
})

let query = app.firestore().collection("messages").orderBy("timestamp", "desc").limit(12)

query.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((event) => {
        let newMsgs = store.getState().messages
        var message = event.doc.data()
        newMsgs.push(message)
        store.dispatch(actions.setMessages(newMsgs))
    })
})

export default app