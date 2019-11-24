/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  displayAnswer: state.hangman.displayAnswer,
});

const AnswerViewer = ({ displayAnswer }) => {
  // generate the array of string characters
  const dispCharArray = [];
  for (let i = 0; i < displayAnswer.length; i += 1) {
    dispCharArray.push(
      <span
        className="letter__item"
        key={i}
      >
        {`${displayAnswer[i]} `}
      </span>,
    );
  }

  return (
    <div className="letter__list">
      {dispCharArray}
    </div>
  );
};


export default connect(mapStateToProps)(AnswerViewer);
