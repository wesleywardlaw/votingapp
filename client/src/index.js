import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import PollsIndex from './components/polls_index';
import PollsNew from './components/polls_new';
import PollsShow from './components/polls_show';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we have a token, consider the user to be signed in
if(token){
	//we need to update application state
	store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
  
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/signup" component={Signup} />
          <Route path="/pollsnew" component={PollsNew} />
          <Route path="/feature" component={RequireAuth(Feature)} />
          <Route path="/polls/:id" component={PollsShow} />
          <Route path="/" component={PollsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));



