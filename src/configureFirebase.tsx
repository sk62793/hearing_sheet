import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { createFirestoreInstance } from 'redux-firestore'
import { firebaseConfig } from './config/firebase_config'

try {
  firebase.initializeApp(firebaseConfig)
} catch (e) {
  console.log('Error in signInWithCustomToken')
}

export default firebase;
export const db = firebase.firestore()

export const configureFirebase = (appStore:any) => {
  const rrfConfig = {}
  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: appStore.dispatch,
    createFirestoreInstance
  }
  return rrfProps
}
