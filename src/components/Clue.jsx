import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  dbQuestion: state.hangman.dbQuestion,
});

// props coming down include a clue string and a function that gets a newQuestion
const Clue = ({ dbQuestion, newQuestion }) => (
  <div className="clue">
    <h5 className="clue__title">CLUE</h5>
    {/* render the clue string */}
    {dbQuestion}

    {/*
      button that when clicked will get a new question and emit it to all other users via socketio
     */}
    <button className="new-question" type="button" onClick={newQuestion}>NEW QUESTION (PRESS ENTER)</button>
  </div>
);

export default connect(mapStateToProps)(Clue);
