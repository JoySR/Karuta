import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import {render} from 'react-dom';

import App from './app/containers/App';
import NotFound from './app/containers/NotFound';

// Render the main app react component into the app div.
// For more details see: https://facebook.github.io/react/docs/top-level-api.html#react.render
render((
  <Router history={hashHistory}>
    <Route path="/" component={App} />
    <Route path="*" component={NotFound} />
  </Router>
), document.getElementById('app'));
