import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';

const mapStateToProps = (state) => ({
  dbQuestion: state.hangman.dbQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  thunkQuestionAnswerFetch: () => dispatch(actions.thunkQuestionAnswerFetch()),
});

// props coming down include a clue string and a function that gets a newQuestion
const Clue = ({ dbQuestion, thunkQuestionAnswerFetch }) => (
  <div className="clue">
    <h5 className="clue__title">CLUE</h5>
    {/* render the clue string */}
    {dbQuestion}

    {/*
      button that when clicked will fetch from /newQuestion, which emits newQ&A to all clients
     */}
    <button className="new-question" type="button" onClick={thunkQuestionAnswerFetch}>
      NEW QUESTION (OR PRESS ENTER)
    </button>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Clue);
