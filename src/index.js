import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import { Provider } from 'react-redux';
import reducer from './components/reducers';

import configureStore from './configureStore';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();

const theme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: green['A700']
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();