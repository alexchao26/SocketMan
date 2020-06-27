import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import image1 from '../assets/imgs/figure1.png';
import image2 from '../assets/imgs/figure2.png';
import image3 from '../assets/imgs/figure3.png';
import image4 from '../assets/imgs/figure4.png';
import image5 from '../assets/imgs/figure5.png';
import image6 from '../assets/imgs/figure6.png';

const hangmanImages = [image1, image2, image3, image4, image5, image6];

const Image = styled.img`
  height: 150px;
  width: 150px;
  object-fit: scale-down;
  margin-top: 12px;
`;

// map in the number of failed guesses to this component to decide
// which image to render for the hanging man
const mapStateToProps = (state) => ({
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});

const HangingDude = ({ numberOfFailedGuesses }) => {
  // figure out which image to render based on failed guesses
  const figureNumber = Math.min(numberOfFailedGuesses, 5);

  return (
    <Image
      alt="hangman dude"
      src={hangmanImages[figureNumber]}
    />
  );
};

export default connect(mapStateToProps)(HangingDude);
