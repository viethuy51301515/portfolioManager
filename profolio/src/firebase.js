import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyCSR8Zx7YtxhuR4PNffSms5pCD9wwwHnos",
    authDomain: "huyprofile-d60d5.firebaseapp.com",
    databaseURL: "https://huyprofile-d60d5.firebaseio.com/",
    projectId: "huyprofile-d60d5",
    storageBucket: "huyprofile-d60d5.appspot.com",
    messagingSenderId: "118559574268",
    // appId: "1:551456913980:web:6310b38d5332495c502139",
    // measurementId: "G-6DRKCP4ZBM"
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
const store = firebase.storage().ref();
export const inforStore = databaseRef;