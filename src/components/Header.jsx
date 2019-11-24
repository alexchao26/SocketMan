import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  userCount: state.hangman.userCount,
});

// functional component that renders the header HTML elements
const header = ({ userCount }) => (
  <header className="splash__header">
    <h1 className="splash__title">SocketMan</h1>
    <span className="splash__version">
      {`Players: ${userCount}`}
    </span>
  </header>
);

export default connect(mapStateToProps)(header);
