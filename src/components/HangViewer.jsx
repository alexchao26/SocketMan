import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  display: table;
  text-align: center;
  margin-top: 16px;
`;

// inject state from the store directly into this component
const mapStateToProps = (state) => ({
  hangingPrompts: state.hangman.hangingPrompts,
  numberOfFailedGuesses: state.hangman.numberOfFailedGuesses,
});

const HangViewer = ({ hangingPrompts, numberOfFailedGuesses }) => (
  <Container>
    <h5>Words from the hangman</h5>
    {/* render the prompt from the hangman (these get worse and worse)  */}
    {hangingPrompts[numberOfFailedGuesses]}
  </Container>
);

export default connect(mapStateToProps)(HangViewer);
