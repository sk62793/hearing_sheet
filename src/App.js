import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router-dom';

import AnswerPage from './pages/Briefing/Answer.js';
import EditPage from './pages/Briefing/Edit.js';
import FormList from './pages/Briefing/FormList.js';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
            <Route exact path="/" component={FormList} />
            <Route exact path="/forms" component={FormList} />
            <Route exact path="/answer" component={AnswerPage} />
            <Route exact path="/edit" component={EditPage} />
        </Switch>
      </React.Fragment>
    )
  }
}

export default App;
