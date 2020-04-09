import React from 'react';
import { connect } from 'react-redux';

// map in the number of failed guesses to this component to decide
// which image to render for the hanging man
const mapStateToProps = (state) => ({
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});

const HangingDude = ({ numberOfFailedGuesses }) => {
  // figure out which image to render based on failed guesses
  let figureNumber = numberOfFailedGuesses + 1;

  // max it out at six
  if (figureNumber > 6) figureNumber = 6;

  return (
    <img
      alt="hangman dude"
      src={`/imgs/figure${figureNumber}.png`}
    />
  );
};

export default connect(mapStateToProps)(HangingDude);
