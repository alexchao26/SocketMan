import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import styled from 'styled-components';

import LetterWrapper from './LetterWrapper';
import Clue from './Clue';
import HangViewer from './HangViewer';
import HangingDude from './HangingDude';
import Header from './Header';
import GameOver from './GameOver';
import * as actions from '../actions/actions';

// styled div container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 0;
`;

// map the dbAnswer and letters to check if the pressed letter if within the answer or not
const mapStateToProps = (state) => ({
  dbQuestion: state.hangman.dbQuestion,
  dbAnswer: state.hangman.dbAnswer,
  letters: state.hangman.letters,
  gameoverBoolean: state.hangman.gameoverBoolean,
  thunkQuestionAnswerFetch: state.hangman.thunkQuestionAnswerFetch,
});

// map dispatcher actions to reducers
const mapDispatchToProps = (dispatch) => ({
  updateLetter: (letter) => dispatch(actions.updateLetter(letter)),
  updateDisplayAnswer: (letter) => dispatch(actions.updateDisplayAnswer(letter)),
  incrementFailedGuesses: () => dispatch(actions.incrementFailedGuesses()),
  checkWin: () => dispatch(actions.checkWin()),
  newQuestionAndAnswer: (question, answer) => (
    dispatch(actions.newQuestionAndAnswer(question, answer))
  ),
  updateUserCount: (userCount) => dispatch(actions.updateUserCount(userCount)),
  thunkQuestionAnswerFetch: () => dispatch(actions.thunkQuestionAnswerFetch()),
});

class GameRoom extends Component {
  constructor(props) {
    super(props);

    // method to handle user inputs
    this.letterClicked = this.letterClicked.bind(this);

    // URL to socket server, in this case it's the same server that's serving the entire app
    this.socket = io.connect('/');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, updateDisplayAnswer, incrementFailedGuesses,
      newQuestionAndAnswer, checkWin, updateUserCount, thunkQuestionAnswerFetch,
    } = this.props;

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      // need to destructure in here to avoid stale dbAnswer & letters due to closure to
      // the scope of compDidMount
      const { dbAnswer, letters } = this.props;

      // check if answer in state has the letter
      if (dbAnswer.includes(letter)) updateDisplayAnswer(letter);
      else if (!letters[letter]) incrementFailedGuesses();

      // dispatch to update letters in store
      updateLetter(letter);

      // then check wins after letters are updated and letter is validated against dbAnswer
      checkWin();
    });

    // if a newQuestion is emitted, dispatch the new question and answer to update the store
    // this is to sync up all user's redux stores!
    this.socket.on('newQuestion', (question, answer) => {
      // console.log('new question SOCKET triggered', question, answer);
      newQuestionAndAnswer(question, answer);
    });

    this.socket.on('userCount', (userCount) => {
      updateUserCount(userCount);
    });

    // trigger newQuestion endpoint upon the first compDidMount
    // invoke thunk for initial question load
    thunkQuestionAnswerFetch();

    // handle keypresses (sends to letterClicked method)
    document.addEventListener('keypress', (e) => this.letterClicked(e.key.toLowerCase()));
  }


  // if component will unmount, remove the event listener (this is mainly for the hotmod reload)
  componentWillUnmount() {
    document.removeEventListener('keypress', (e) => this.letterClicked(e.key.toLowerCase()));
  }

  // change state when letter is selected
  letterClicked(letter) {
    // console.log('letter clicked was:', letter, letter.charCodeAt(0));
    const { gameoverBoolean, thunkQuestionAnswerFetch } = this.props;
    // only allow lower case letters, or ENTER for newQuestion
    if (letter === 'enter') {
      // console.log('new question clicked!');
      thunkQuestionAnswerFetch();
    } else if (!gameoverBoolean && letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
      this.socket.emit('clickedLetter', letter);
    }
  }


  render() {
    // return all the things and stuff to render
    return (
      <Container>
        <Header />
        <HangingDude />
        <LetterWrapper letterClicked={this.letterClicked} />
        <Clue />
        <HangViewer />
        <GameOver />
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameRoom);
