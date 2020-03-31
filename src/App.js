import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home.js';
import AnswerForm from './components/AnswerForm/AnswerForm.js';
import CreateForm from './components/CreateForm/CreateForm.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/answer_form" component={AnswerForm} />
            <Route exact path="/create_form" component={CreateForm} />
            <Route exact path="/complete" />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
