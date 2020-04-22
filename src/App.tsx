import React from 'react';
import './App.css';

import { Route, Switch, RouteComponentProps, withRouter } from 'react-router-dom';

import AnswerPage from './pages/Briefing/Answer';
import EditPage from './pages/Briefing/Edit';
import FormList from './pages/Briefing/FormList';

interface Props extends RouteComponentProps<void> { }

const App: React.FC<Props> = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={FormList} />
        <Route exact path="/forms" component={FormList} />
        <Route exact path="/answer" component={AnswerPage} />
        <Route exact path="/edit" component={EditPage} />
      </Switch>
    </>
  )
}
export default withRouter(App);
