import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LetterSelector from './LetterSelector';
import AnswerViewer from './AnswerViewer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  max-width: 500px;
`;

const mapStateToProps = (state) => ({
  letters: state.hangman.letters,
});

const LetterWrapper = ({ letters, letterClicked }) => (
  <Container>
    <AnswerViewer />
    <LetterSelector
      letters={letters}
      letterClicked={letterClicked}
    />
  </Container>
);

export default connect(mapStateToProps)(LetterWrapper);
