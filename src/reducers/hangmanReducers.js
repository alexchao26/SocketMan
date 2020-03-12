// reducers for all hangman games

import * as types from '../constants/actionTypes';

// set up initial state
const initialState = {
  letters: {}, // tracks which letters have been clicked
  // a default question and answer (if connection is very slow)
  dbQuestion: 'It is the thing you might cut yourself on if you reach out to touch the world like a ball',
  dbAnswer: ['m', 'o', 'u', 'n', 't', 'a', 'i', 'n'],
  displayAnswer: [],
  hangingPrompts: [
    "I'm having a great day and nothing can go wrong.",
    "Who? Me? I didn't do anything.",
    "I'm on trial?",
    "I'm guilty?",
    "No. I don't believe it.",
    'Ahh. Help!!',
    'The End. (Everytime you lose at hangman, a stick family loses a member)',
  ],
  numberOfFailedGuesses: 0,
  userCount: 0,
  gameoverBoolean: false,
  winnerBoolean: false,
};

for (let i = 97; i < 123; i += 1) {
  initialState.letters[String.fromCharCode(i)] = false;
}
initialState.dbAnswer.forEach(() => initialState.displayAnswer.push('_'));
// console.log('init state', initialState);

/**
*
* REDUCERS
*
********** */
const hangmanReducer = (state = initialState, action) => {
  // some let variables to be accessible outside of scope of switch
  let letters;
  let dbQuestion;
  let dbAnswer;
  let displayAnswer;
  let numberOfFailedGuesses;
  const maxNumberOfGuesses = state.hangingPrompts.length - 1;

  switch (action.type) {
    case types.NEW_QUESTION_AND_ANSWER:
      dbQuestion = action.payloadQuestion;
      // eslint-disable-next-line no-nested-ternary
      dbAnswer = typeof action.payloadAnswer === 'string'
        ? action.payloadAnswer.split('')
        : action.payloadAnswer;
      // console.log('answer and db answer in reducer', action.payloadAnswer, dbAnswer);
      displayAnswer = dbAnswer.map(() => '_');
      // reset the entire game (all letters and failed guesses reset)
      return {
        ...initialState,
        dbQuestion,
        dbAnswer,
        displayAnswer,
        letters: initialState.letters,
        numberOfFailedGuesses: 0,
        userCount: state.userCount, // do not reset this value
      };

    case types.UPDATE_USER_COUNT:
      // update the userCount key with the payload
      return {
        ...state,
        userCount: action.payload,
      };

    case types.UPDATE_DISPLAY_ANSWER:
      // todo refactor to a map
      // make shallow copy of display answer array
      displayAnswer = [...state.displayAnswer];
      // action.payload has the letter that is correct
      state.dbAnswer.forEach((ele, i) => {
        if (ele === action.payload) {
          displayAnswer[i] = ele;
        }
      });
      // console.log('in reducer', displayAnswer);
      return { ...state, displayAnswer };

    case types.INCREMENT_FAILED_GUESSES:
      // increment the failed number of guesses if this is triggered
      numberOfFailedGuesses = state.numberOfFailedGuesses + 1;
      if (numberOfFailedGuesses > maxNumberOfGuesses) {
        numberOfFailedGuesses = maxNumberOfGuesses + 1;
      }
      return { ...state, numberOfFailedGuesses };

    case types.UPDATE_LETTER:
      // update the letters object with a true, in the place of the payload's letter
      // console.log('update letter reducer on');
      letters = { ...state.letters };
      // update the inputted letter to true in store/state
      letters[action.payload] = true;
      // return object updates store/state
      return { ...state, letters };

    case types.CHECK_WIN:
      numberOfFailedGuesses = state.numberOfFailedGuesses;

      // to handle button mashing
      if (numberOfFailedGuesses >= maxNumberOfGuesses) {
        return {
          ...state,
          gameoverBoolean: true,
          winnerBoolean: false,
        };
      }
      if (state.displayAnswer.join('') === state.dbAnswer.join('')) {
        return {
          ...state,
          gameoverBoolean: true,
          winnerBoolean: true,
        };
      }
      return { ...state };

    default:
      // return the initial state if action.type does not match any of cases
      return state;
  }
};

export default hangmanReducer;
