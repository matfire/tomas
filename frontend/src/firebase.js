import * as firebase from 'firebase'
import 'firebase/storage'
const app = firebase.initializeApp({
	apiKey: "AIzaSyCqB4GHvjCHQsPaRQRJrf29_OHmzwpM_WI",
    authDomain: "tomas-9a671.firebaseapp.com",
    databaseURL: "https://tomas-9a671.firebaseio.com",
    projectId: "tomas-9a671",
    storageBucket: "gs://tomas-9a671.appspot.com",
    messagingSenderId: "321268051130",
    appId: "1:321268051130:web:a9c860c1ef0507403f2683"
})

export default app