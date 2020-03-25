import firebase from 'firebase';
import '@firebase/firestore'
import ReduxSagaFirebase from 'redux-saga-firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apikey: 'AIzaSyA8BDC_QtuYXZxG2BZwT6SISmKnkD0rEzw',
    authDomain: 'harvest-form.firebaseapp.com',
    databaseURL: 'https://harvest-form.firebaseio.com',
    projectId: 'harvest-form',
}

firebase.initializeApp(firebaseConfig);

export default firebase;
export const db = firebase.firestore();
