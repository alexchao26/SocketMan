import React from 'react';
import { hot } from 'react-hot-loader';

import './styles/App.css';
import './styles/AppLg.css';
import { Route } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime'; // for async/await in React
import GameRoom from './containers/GameRoom';

const App = () => (
  <Route path="/" component={GameRoom} />
);

export default hot(module)(App);
