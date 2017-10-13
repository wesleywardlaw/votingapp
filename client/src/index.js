import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reduxThunk from 'redux-thunk';

import Header from './components/header';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import PollsIndex from './components/polls_index';
import MyPolls from './components/my_polls';
import PollsNew from './components/polls_new';
import PollsShow from './components/polls_show';
import PollsEdit from './components/polls_edit';
import PollsNewOption from './components/polls_new_option';
import RequireAuth from './components/auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

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
          <Route path="/polls/:id/edit" component={RequireAuth(PollsEdit)} />
          <Route path="/polls/:id/newoption" component={RequireAuth(PollsNewOption)} />
          <Route path="/polls/new" component={RequireAuth(PollsNew)} />
          <Route path="/mypolls" component={RequireAuth(MyPolls)} />
          <Route path="/feature" component={RequireAuth(Feature)} />

          <Route path="/polls/:id" component={PollsShow} />
          <Route path="/" component={PollsIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));



