import * as firebase from 'firebase';
const config = {
    apiKey: "AIzaSyDSkKKO1e-JPhykuu_42eg-i-i-J5qhjck",
    authDomain: "englishc-35fa0.firebaseapp.com",
    databaseURL: "https://englishc-35fa0.firebaseio.com",
    projectId: "englishc-35fa0",
    storageBucket: "englishc-35fa0.appspot.com",
    messagingSenderId: "551456913980",
    appId: "1:551456913980:web:6310b38d5332495c502139",
    measurementId: "G-6DRKCP4ZBM"
}
firebase.initializeApp(config);
const databaseRef = firebase.database().ref();
export const eventRef = databaseRef.child("news_event");
export const teacherRef = databaseRef.child("teacherList");
export const teacherStore = firebase.storage().ref('teacherImg');
export const authLogin = firebase.auth();

