import * as firebase from 'firebase'
import 'firebase/storage'
import 'firebase/firestore'
import store from '../Store/ConfigStore'

var firebaseConfig = {
    apiKey: "AIzaSyCqB4GHvjCHQsPaRQRJrf29_OHmzwpM_WI",
    authDomain: "tomas-9a671.firebaseapp.com",
    databaseURL: "https://tomas-9a671.firebaseio.com/",
    projectId: "tomas-9a671",
    storageBucket: "tomas-9a671.appspot.com",
    messagingSenderId: "321268051130",
    appId: "1:321268051130:web:619f4e714fdbee343f2683"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


    let query = firebase.firestore().collection("messages").orderBy("timestamp", "desc").limit(12)

    query.onSnapshot(snapshot => {
      let newMsg = store.getState().messages
      snapshot.docChanges().forEach(change => {
        if (change.type === "removed") {
          // effacer de la liste
        } else {
          let message = change.doc.data()
          newMsg.push({...message, user:{_id:message.name, name:message.name}, _id:message.timestamp})
        }
      })
      store.dispatch({
        type:"SET_MESSAGES",
        payload:newMsg
      })
    })

export default firebase;