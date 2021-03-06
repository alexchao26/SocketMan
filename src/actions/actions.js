/**
 * ************************************
 *
 * @module  actions.js
 * @author
 * @date
 * @description Action Creators
 *
 * ************************************
 */

// import actionType constants
import * as types from '../constants/actionTypes';

// this action is for updating the letters object in store that tracks all letters of the alphabet
export const updateLetter = (letter) => ({
  type: types.UPDATE_LETTER,
  payload: letter,
});

// this action is for updating the displayed answer
export const updateDisplayAnswer = (letter) => ({
  type: types.UPDATE_DISPLAY_ANSWER,
  payload: letter,
});

export const incrementFailedGuesses = () => ({
  type: types.INCREMENT_FAILED_GUESSES,
  payload: null,
});

export const updateRoomsToDisplay = (rooms) => ({
  type: types.LOAD_ROOMS,
  payload: rooms,
});

export const checkWin = () => ({
  type: types.CHECK_WIN,
  payload: null,
});

// grab a new question from the mongoDB
export const newQuestionAndAnswer = (question, answer) => ({
  type: types.NEW_QUESTION_AND_ANSWER,
  payloadQuestion: question,
  payloadAnswer: answer,
});

export const updateUserCount = (userCount) => ({
  type: types.UPDATE_USER_COUNT,
  payload: userCount,
});

// thunk, return a function that invokes dispatch param w/ proper async control
export const thunkQuestionAnswerFetch = () => (dispatch) => (
  // don't even need options anymore b/c this is just to prompt the server emit out a new question
  fetch('/newPrompt', {
    cache: 'no-store',
  })
    .catch((err) => console.log('Error getting new questions and answers :(', err))
);
