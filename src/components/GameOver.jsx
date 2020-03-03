import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  gameoverBoolean: state.hangman.gameoverBoolean,
  winnerBoolean: state.hangman.winnerBoolean,
});

const GameOver = ({ gameoverBoolean, winnerBoolean, fetchNewQuestion }) => (
  <div className={`gameover ${gameoverBoolean && 'isOver'}`}>
    {
        winnerBoolean
          ? 'WINNER WINNER CHICKEN DINNER!'
          : 'YOU LOSE!'
      }
    <br />
    <button className="new-question win-box" type="button" onClick={fetchNewQuestion}>
      NEW QUESTION (OR PRESS ENTER)
    </button>
  </div>
);
export default connect(mapStateToProps)(GameOver);
