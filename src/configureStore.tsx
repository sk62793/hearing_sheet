import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducers';
import rootSaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

export default function configureStore(initialState:any) {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        initialState,
        composeWithDevTools(
            applyMiddleware(sagaMiddleware),
        )
    );

    sagaMiddleware.run(rootSaga);
    return store;
}
