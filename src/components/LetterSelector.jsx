import React from 'react';
import styled from 'styled-components';

const LetterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 16px 0;
`;

const LetterButton = styled.button`
  background-color: white;
  border: 1px solid #424242;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  width: 48px;
  margin: 0 2px 2px 2px;
  cursor: pointer;

  &:hover {
    background-color: #3d00e0;
    color: white;
  }
  &:active {
    outline: #90ee02 solid 1px;
    opacity: .75;
  }
  &:disabled {
    background-color: gray;
  }
`;

const LetterSelector = ({ letters: lettersProp, letterClicked }) => (
  <LetterContainer>
    {Object.keys(lettersProp).map((letter) => (
      <LetterButton
        key={letter}
        disabled={lettersProp[letter] ? 'disabled' : null}
        onClick={() => { letterClicked(letter); }}
      >
        {letter}
      </LetterButton>
    ))}
  </LetterContainer>
);
export default LetterSelector;
