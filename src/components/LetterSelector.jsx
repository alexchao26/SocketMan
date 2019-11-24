import React from 'react';

const LetterSelector = ({ letters, letterClicked }) => {
  const letterObj = letters;
  const letterArr = Object.keys(letterObj);

  // generate buttons for each  letter
  const letterButtonArr = [];
  for (let i = 0; i < letterArr.length; i += 1) {
    letterButtonArr.push(
      <button
        type="button"
        key={`${letterArr[i]}_button`}
        className="letter__button-item"
        disabled={letterObj[letterArr[i]] ? 'disabled' : null}
        onClick={
          () => {
            letterClicked(letterArr[i]);
          }
        }
      >
        {letterArr[i]}
      </button>,
    );
  }

  return (
    <div className="letter__buttons">
      {letterButtonArr}
    </div>
  );
};

export default LetterSelector;
