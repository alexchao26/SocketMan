import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  gameoverBoolean: state.hangman.gameoverBoolean,
  winnerBoolean: state.hangman.winnerBoolean,
  userIsMobile: state.hangman.userIsMobile,
});

const mapDispatchToProps = (dispatch) => ({
  thunkQuestionAnswerFetch: () => dispatch(actions.thunkQuestionAnswerFetch()),
});


const GameOver = ({
  gameoverBoolean, winnerBoolean, thunkQuestionAnswerFetch, userIsMobile,
}) => (
  <div className={`gameover ${gameoverBoolean && 'isOver'}`}>
    {
        winnerBoolean
          ? 'WINNER WINNER CHICKEN DINNER!'
          : 'YOU LOSE!'
      }
    <br />
    <button className="new-question win-box" type="button" onClick={thunkQuestionAnswerFetch}>
      {userIsMobile ? 'NEW QUESTION' : 'NEW QUESTION (OR PRESS ENTER)'}
    </button>
  </div>
);
export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
