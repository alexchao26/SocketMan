import React from 'react';
import { connect } from 'react-redux';
import LetterSelector from './LetterSelector';
import AnswerViewer from './AnswerViewer';

const mapStateToProps = (state) => ({
  letters: state.hangman.letters,
});

const LetterWrapper = ({ letters, letterClicked }) => (
  <div className="letter-wrapper">
    <AnswerViewer />
    <LetterSelector
      letters={letters}
      letterClicked={letterClicked}
    />
  </div>
);

export default connect(mapStateToProps)(LetterWrapper);
