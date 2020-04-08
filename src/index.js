import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import { Provider } from 'react-redux';

import configureStore from './configureStore';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './History';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';


const store = configureStore();
const rrfConfig = {}
const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

export const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: green['A700']
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <MuiThemeProvider theme={theme}>
                <Router history={history}>
                    <App />
                </Router>
            </MuiThemeProvider>
        </ReactReduxFirebaseProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
