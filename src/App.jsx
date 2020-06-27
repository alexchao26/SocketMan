import React from 'react';
import { hot } from 'react-hot-loader';

import './styles/App.css';
import './styles/AppLg.css';

import GameRoom from './components/GameRoom';

const App = () => (
  <GameRoom />
);

export default hot(module)(App);
