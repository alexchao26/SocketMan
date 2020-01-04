/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import { connect } from 'react-redux';

import LetterWrapper from './LetterWrapper';
import Clue from '../components/Clue';
import HangViewer from '../components/HangViewer';
import HangingDude from '../components/HangingDude';
import Header from '../components/Header';
import * as actions from '../actions/actions';

// map the dbAnswer and letters to check if the pressed letter if within the answer or not
const mapStateToProps = (state) => ({
  dbAnswer: state.hangman.dbAnswer,
  letters: state.hangman.letters,
});

// map dispatcher actions to reducers
const mapDispatchToProps = (dispatch) => ({
  updateLetter(letter) {
    dispatch(actions.updateLetter(letter));
  },
  updateDisplayAnswer(letter) {
    dispatch(actions.updateDisplayAnswer(letter));
  },
  incrementFailedGuesses() {
    dispatch(actions.incrementFailedGuesses());
  },
  checkWin() {
    dispatch(actions.checkWin());
  },
  newQuestionNoFetch(question, answer) {
    // dispatch a new question to the reducers, triggered by an emitter, NOT a fetch
    dispatch(actions.newQuestionNoFetch(question, answer));
  },
  updateUserCount(userCount) {
    dispatch(actions.updateUserCount(userCount));
  },
});

class GameRoom extends Component {
  constructor(props) {
    super(props);

    // two methods that handle user inputs
    this.letterClicked = this.letterClicked.bind(this);
    this.newQuestion = this.newQuestion.bind(this);

    // URL to socket server, in this case it's the same server that's serving the entire app
    this.socket = io.connect('/');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, updateDisplayAnswer, incrementFailedGuesses,
      newQuestionNoFetch, checkWin, updateUserCount,
    } = this.props;

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      // check if answer in state has the letter, this cannot use destructuring because
      // the closure will not allow for new questions/answers!!!
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.dbAnswer.includes(letter)) updateDisplayAnswer(letter);
      // eslint-disable-next-line react/destructuring-assignment
      else if (!this.props.letters[letter]) incrementFailedGuesses();

      // dispatch to update letters in store
      updateLetter(letter);

      // then check wins after letters are updated and letter is validated against dbAnswer
      checkWin();
    });

    // if a newQuestion is emitted, dispatch the new question and answer to update the store
    // this is to sync up all user's redux stores!
    this.socket.on('newQuestion', (question, answer) => {
      // console.log('new question SOCKET triggered', question, answer);
      newQuestionNoFetch(question, answer);
    });

    this.socket.on('userCount', (userCount) => {
      updateUserCount(userCount);
    });

    // trigger newQuestion upon the first compDidMount
    this.newQuestion();

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

    // const { newQuestion } = this.props;
    // only allow lower case letters, or ENTER for newQuestion
    if (letter === 'enter') {
      // console.log('new question clicked!');
      this.newQuestion();
    } else if (letter.charCodeAt(0) >= 97 && letter.charCodeAt(0) <= 122) {
      this.socket.emit('clickedLetter', letter);
    }
  }

  async newQuestion() {
    const qAndA = await fetch('/newPrompt', {
      headers: {
        'Cache-Control': 'no-cache', // no caching or else this will grab the cached (old) question
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => json) // return the response out to qAndA variable
      // eslint-disable-next-line no-console
      .catch((err) => console.log('Error fetching new question from the database: ', err));

    const { question, answer } = qAndA;
    this.socket.emit('newQuestion', question, answer);
  }

  render() {
    // return all the things and stuff to render
    return (
      <div className="App">
        <Header />
        <HangingDude />
        <LetterWrapper letterClicked={this.letterClicked} />
        <Clue newQuestion={this.newQuestion} />
        <HangViewer />
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
