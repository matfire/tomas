import * as firebase from 'firebase'
import 'firebase/storage'

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

export default firebase;