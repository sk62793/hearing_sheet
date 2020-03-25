import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home.jsx';
import Form from './components/Form/Form.jsx';
import CreateForm from './components/CreateForm/CreateForm.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/form" component={Form} />
            <Route exact path="/create_form" component={CreateForm} />
            <Route exact path="/complete" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
