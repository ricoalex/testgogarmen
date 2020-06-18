import React, { Fragment } from 'react';
import './App.css';
import { Login } from './components/auth/Login';
import Register from './components/auth/Register';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Login} />
          <Switch>
              <Route exact path="/register" component={Register} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
