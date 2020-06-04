import React from 'react';
import { connect } from 'react-redux';
import image1 from '../assets/imgs/figure1.png';
import image2 from '../assets/imgs/figure2.png';
import image3 from '../assets/imgs/figure3.png';
import image4 from '../assets/imgs/figure4.png';
import image5 from '../assets/imgs/figure5.png';
import image6 from '../assets/imgs/figure6.png';

const hangmanImages = [image1, image2, image3, image4, image5, image6];

// map in the number of failed guesses to this component to decide
// which image to render for the hanging man
const mapStateToProps = (state) => ({
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});

const HangingDude = ({ numberOfFailedGuesses }) => {
  // figure out which image to render based on failed guesses
  let figureNumber = numberOfFailedGuesses;

  // max it out at six
  if (figureNumber > 5) figureNumber = 5;

  return (
    <img
      alt="hangman dude"
      src={hangmanImages[figureNumber]}
    />
  );
};

export default connect(mapStateToProps)(HangingDude);
