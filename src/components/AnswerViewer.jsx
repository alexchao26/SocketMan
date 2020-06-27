import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AnswerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 28px;
  margin: 12px 0;

  span {
    margin: 0 4px;
  }
`;

const mapStateToProps = (state) => ({
  displayAnswer: state.hangman.displayAnswer,
});

// display all of the answer characters as spans
const AnswerViewer = ({ displayAnswer }) => (
  <AnswerContainer>
    {displayAnswer.map((char, index) => (
      <span key={`${char}${index}`}>{char}</span>
    ))}
  </AnswerContainer>
);


export default connect(mapStateToProps)(AnswerViewer);
