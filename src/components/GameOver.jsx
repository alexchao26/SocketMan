import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import * as actions from '../actions/actions';

const Container = styled.div`
  opacity: 0;
  position: absolute;
  margin: auto;
  top: 30vh;

  width: 95vw;
  max-width: 600px;
  
  background-color: white;
  border: 2px solid #90ee02;
  text-align: center;
  vertical-align: middle;
  padding: 3vh 0;
  border-radius: 2vw;
  font-size: 2rem;
  z-index: -1;
  
  transform: scale(0);
  transition: all .1s ease-in-out;

  ${({ isOver }) => (
    isOver && css`
      transform: scale(1);
      opacity: 1;
      z-index: 10;
    `
  )}
`;

const NewQuestionButton = styled.button`
  background-color: transparent;
  border: 0.5px solid #424242;
  border-radius: 5px;
  padding: 5px;
  color: #424242;

  margin: 1vw 0 0 0;
  font-size: 1rem;
  width: 90vw;
  max-width: 550px;

  &:hover {
    color: #90ee02;
    background-color: #3d00e0;
    border-color: #000080;
  }
`;

const mapStateToProps = (state) => ({
  gameoverBoolean: state.hangman.gameoverBoolean,
  winnerBoolean: state.hangman.winnerBoolean,
  userIsMobile: state.hangman.userIsMobile,
});

const mapDispatchToProps = (dispatch) => ({
  thunkQuestionAnswerFetch: () => dispatch(actions.thunkQuestionAnswerFetch()),
});


const GameOver = ({
  gameoverBoolean, winnerBoolean, thunkQuestionAnswerFetch, userIsMobile,
}) => (
  <Container isOver={gameoverBoolean}>
    {
        winnerBoolean
          ? 'WINNER WINNER CHICKEN DINNER!'
          : 'YOU LOSE!'
      }
    <br />
    <NewQuestionButton type="button" onClick={thunkQuestionAnswerFetch}>
      {userIsMobile ? 'NEW QUESTION' : 'NEW QUESTION (OR PRESS ENTER)'}
    </NewQuestionButton>
  </Container>
);
export default connect(mapStateToProps, mapDispatchToProps)(GameOver);
