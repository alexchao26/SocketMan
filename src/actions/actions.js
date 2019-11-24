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
export const newQuestionNoFetch = (question, answer) => ({
  type: types.NEW_QUESTION,
  payloadQuestion: question,
  payloadAnswer: answer,
});

export const updateUserCount = (userCount) => ({
  type: types.UPDATE_USER_COUNT,
  payload: userCount,
});
