import firebase from 'firebase/app';
import 'firebase/firestore';
require('firebase/auth');
//import {API_KEY , AUTH_DOMAIN ,DATABASE_URL , PROJECT_ID ,STORAGE_BUCKET , MESSAGING_SENDER_ID , APP_ID} from 'react-native-dotenv';
var firebaseConfig = {
    apiKey: "AIzaSyAsy-LwPQ-u2FSNdJGTtRYbA_nFK_CrOA4",
    authDomain: "chatappreact-ad871.firebaseapp.com",
    databaseURL: "https://chatappreact-ad871.firebaseio.com",
    projectId: "chatappreact-ad871",
    storageBucket: "chatappreact-ad871.appspot.com",
    messagingSenderId: "903841936617",
    appId: "1:903841936617:web:1d3c10cf796caf726eac78",
    measurementId: "G-0D45H1LRV5"
  };

  firebase.initializeApp(firebaseConfig)
  export const firestore = firebase.firestore()
  export default firebase;