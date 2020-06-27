import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../actions/actions';

const ClueContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #424242;
  background-color: #90ee02;
  font-weight: 600;
  font-size: 18px;
  padding: 15px 24px;
  margin: 20px;
  max-width: 500px;

  h5 {
    font-size: 24px;
  }

  button {
    background-color: transparent;
    border: 0.5px solid #424242;
    border-radius: 5px;
    padding: 5px;
    color: #424242;
    margin-top: 8PX;
    
    &:hover {
      color: #90ee02;
      background-color: #3d00e0;
      border-color: #000080;
    }
  }
`;

const mapStateToProps = (state) => ({
  dbQuestion: state.hangman.dbQuestion,
  userIsMobile: state.hangman.userIsMobile,
});

const mapDispatchToProps = (dispatch) => ({
  thunkQuestionAnswerFetch: () => dispatch(actions.thunkQuestionAnswerFetch()),
});

// props coming down include a clue string and a function that gets a newQuestion
const Clue = ({ dbQuestion, thunkQuestionAnswerFetch, userIsMobile }) => (
  <ClueContainer>
    <h5>CLUE</h5>
    {/* render the clue string */}
    {dbQuestion}

    {/*
      button that when clicked will fetch from /newQuestion, which emits newQ&A to all clients
     */}
    <button
      type="button"
      onClick={thunkQuestionAnswerFetch}
    >
      {userIsMobile ? 'NEW QUESTION' : 'NEW QUESTION (OR PRESS ENTER)'}
    </button>
  </ClueContainer>
);

export default connect(mapStateToProps, mapDispatchToProps)(Clue);
