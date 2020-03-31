import firebase from 'firebase';
import '@firebase/firestore'

import 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyA8BDC_QtuYXZxG2BZwT6SISmKnkD0rEzw",
    authDomain: "harvest-form.firebaseapp.com",
    databaseURL: "https://harvest-form.firebaseio.com",
    projectId: "harvest-form",
    storageBucket: "harvest-form.appspot.com",
    messagingSenderId: "430241358180",
    appId: "1:430241358180:web:ee13b4327572aefbb51a71",
    measurementId: "G-V93CMTEKBJ"
}

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;
export const db = firebase.firestore();
