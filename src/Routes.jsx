import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './styles/MainBody.scss';
import { Paper } from '@material-ui/core';
import ProtectedRoute from './ProtectedRoute';

import HomePage from './components/homepage/homepage';
import Admission from './components/student/admission';

export default class Routes extends Component {
  render() {
    return (
      <main className='main-body'>
        <Paper className='main-body-container'>
          <Switch>
            <ProtectedRoute component={HomePage} exact path='/ims/home/' />
            <ProtectedRoute
              component={Admission}
              exact
              path='/ims/student/admission'
            />
            <Route extract path='*' component={() => '404 Not Found'} />
          </Switch>
        </Paper>
      </main>
    );
  }
}
