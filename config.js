import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBdOALeMyD4875Y0OO9BGxmrwtdfbgTVMs",
    authDomain: "phoenix-restaurant-401d8.firebaseapp.com",
    projectId: "phoenix-restaurant-401d8",
    storageBucket: "phoenix-restaurant-401d8.appspot.com",
    messagingSenderId: "14333830812",
    appId: "1:14333830812:web:a09d5bcbe5228966ef6f59",
    measurementId: "G-CS289K6JVV"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };