import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
// Components
import Deck from './components/Deck';
// Variables
import kana from './data/kana';

function App() {
  return (
    <Fragment>
      <Global
        styles={css`
          @import url('https://fonts.googleapis.com/css?family=Open+Sans:600&display=swap');

          * {
            font-family: 'Open Sans', sans-serif;
          }

          body,
          #root {
            width: 100vw;
            height: 100vh;
            margin: 0;
            padding: 0;
          }
        `}
      />
      <Container>
        <Deck deck={kana.hiragana} />
      </Container>
    </Fragment>
  );
}

const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: black;
`;

export default App;
