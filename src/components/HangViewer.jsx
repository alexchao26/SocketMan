import React from 'react';
import { connect } from 'react-redux';

// inject state from the store directly into this component
const mapStateToProps = (state) => ({
  hangingPrompts: state.hangman.hangingPrompts,
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});

const HangViewer = ({ hangingPrompts, numberOfFailedGuesses }) => (
  <div className="hangviewer">
    <h5>Words from the hangman</h5>
    {/* render the prompt from the hangman (these get worse and worse)  */}
    {hangingPrompts[numberOfFailedGuesses]}
  </div>
);

export default connect(mapStateToProps)(HangViewer);
