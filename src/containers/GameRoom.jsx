/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import LetterWrapper from './letterWrapper';
import Clue from '../components/clue';
import HangViewer from '../components/hangViewer';
import HangingDude from '../components/HangingDude';

// import * as types from '../constants/actionTypes';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  letters: state.hangman.letters,
  dbAnswer: state.hangman.dbAnswer,
  dbQuestion: state.hangman.dbQuestion,
  displayAnswer: state.hangman.displayAnswer,
  hangingPrompts: state.hangman.hangingPrompts,
});


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
});

class GameRoom extends Component {
  constructor(props) {
    super(props);

    // two methods that handle user inputs
    this.letterClicked = this.letterClicked.bind(this);
    this.newQuestion = this.newQuestion.bind(this);

    // AWS link for server connection
    this.socket = io.connect('http://socketman.us-east-1.elasticbeanstalk.com/');
  }

  componentDidMount() {
    // destructure props
    const {
      updateLetter, updateDisplayAnswer, incrementFailedGuesses, newQuestionNoFetch,
    } = this.props;

    // create socket listener for clicked letter
    this.socket.on('clickedLetter', (letter) => {
      // console.log('clickedletteris ', letter);

      // dispatch to update letters in store
      updateLetter(letter);

      // check if answer in state has the letter, this cannot use destructuring because
      // the closure will not allow for new questions/answers!!!
      // eslint-disable-next-line react/destructuring-assignment
      if (this.props.dbAnswer.includes(letter)) updateDisplayAnswer(letter);
      else incrementFailedGuesses();
    });

    // if a newQuestion is emitted, dispatch the new question and answer to update the store
    // this is to sync up all user's redux stores!
    this.socket.on('newQuestion', (question, answer) => {
      // console.log('new question SOCKET triggered', question, answer);
      newQuestionNoFetch(question, answer);
    });

    // trigger newQuestion upon the first compDidMount
    this.newQuestion();

    // handle keypresses (sends to letterClicked method)
    document.addEventListener('keypress', (e) => this.letterClicked(e.key.toLowerCase()));
  }

  // everytime the dom updates, check if the user has won the game
  componentDidUpdate() {
    const { checkWin } = this.props;
    checkWin();
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
      .then((json) => json)
      // eslint-disable-next-line no-console
      .catch((err) => console.log('FETCH ERRORRRRRR', err));

    const { question, answer } = qAndA;
    this.socket.emit('newQuestion', question, answer);
  }

  render() {
    // destructure props
    const {
      dbQuestion, dbAnswer, hangingPrompts, numberOfFailedGuesses, letters, displayAnswer,
    } = this.props;

    // return all the things and stuff to render
    return (
      <div className="App">
        <header className="splash__header">
          <h1 className="splash__title">SocketMan</h1>
          <span className="splash__version">x2</span>
        </header>
        <HangingDude />
        <LetterWrapper
          letterClicked={this.letterClicked}
          answer={dbAnswer}
          displayAnswer={displayAnswer}
        />
        <Clue clue={dbQuestion} newQuestion={this.newQuestion} />
        <HangViewer
          hang={hangingPrompts}
          numFailedGuesses={numberOfFailedGuesses}
        />
      </div>
    );
  }
}

export default hot(module)(connect(mapStateToProps, mapDispatchToProps)(GameRoom));
