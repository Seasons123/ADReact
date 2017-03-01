import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './src/App.jsx';
import MainPage from './src/MainPage.jsx';

render((
    <Router history={browserHistory}>
        <Route path={window.App.getAppRoute()} component={App}>
            <IndexRoute component={MainPage}/>
            <Route path={window.App.getAppRoute()+"/"} component={MainPage}/>
        </Route>
    </Router>
), document.getElementById('root'))
