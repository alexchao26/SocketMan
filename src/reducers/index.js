import { combineReducers } from 'redux';

// import reducers here
import hangmanReducer from './hangmanReducers';

// combine reducers
const reducers = combineReducers({
  // key value pairs of name of reducer category: imported above
  hangman: hangmanReducer,
});

export default reducers;
