import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory, Router, Route} from 'react-router';

import './stylesheets/main.scss';
import Root from './components/root.js';

const Routes = (
  <Router history={browserHistory}>
    <Route path="/color-of-the-year/" component={Root} />
    <Route path="/color-of-the-year" component={Root} />
    <Route path="/" component={Root} />
  </Router>
);

ReactDOM.render(Routes, document.getElementById('app'));
