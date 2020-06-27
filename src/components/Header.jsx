import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 12px;

  color: #2c2c2c;
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
  letter-spacing: .05em;
  text-shadow:
      4px 4px 0px #d5d5d5, 
      7px 7px 0px rgba(0, 0, 0, 0.2);

  h1 {
    font-family: inherit;
    font-size: 56px;
  }
  
  span {
    font-family: inherit;
    font-size: 28px;
  }
`;

const mapStateToProps = (state) => ({
  userCount: state.hangman.userCount,
});

// functional component that renders the header HTML elements
const header = ({ userCount }) => (
  <Header>
    <h1>SocketMan</h1>
    <span>
      {`Players: ${userCount}`}
    </span>
  </Header>
);

export default connect(mapStateToProps)(header);
