import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import Home from './components/Home/Home.js';
import AnswerForm from './components/AnswerPage/AnswerPage.js';
import CreateForm from './components/EditSurvey/EditPage.js';
import SignIn from './components/SignIn/SignIn.js';
import FormList from './components/FormListPage/FormListPage.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/answer_form" component={AnswerForm} />
            <Route exact path="/create_form" component={CreateForm} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/forms" component={FormList} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
