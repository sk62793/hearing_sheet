import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import firebase from 'firebase/app';
import { firebaseConfig } from './Firebase';
import createSagaMiddleware from 'redux-saga';
import reducer from './components/reducers';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState) {
    const sagaMiddleware = createSagaMiddleware();
    const createStoreWithFirebase = compose(
        reduxFirestore(firebase, firebaseConfig),
    )(createStore);

    const store = createStoreWithFirebase(
        reducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        )
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
