import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import Home from './components/Home';
import Player from './components/Player';

function App() {
  return (
    <Router>
      <Fragment>
        <Global
          styles={css`
           @import url('https://fonts.googleapis.com/css?family=Space+Mono:400,700&display=swap');

            * {
              font-family: 'Space Mono', monospace;
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
          <Route path="/" exact component={Home} />
          <Route path="/kana" component={Player} />
        </Container>
      </Fragment>
    </Router>
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
