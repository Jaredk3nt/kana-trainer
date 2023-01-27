import React, { Fragment } from 'react';
import styled from '@emotion/styled';
import { Global, css } from '@emotion/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// Components
import Home from './components/Home';
import Player from './components/Player';
import CharacterSelect from './components/CharacterSelect';
import SetSelect from './components/SetSelect';
import MyCharacters from './components/MyCharacters';
import MyCharactersContext from './context/myCharactersContext';
import useMyCharacters from './hooks/useMyCharacters';
import useMySets from './hooks/useMySets';
import MySetsContext from './context/mySetsContext';

function App() {
  const { list, add, remove } = useMyCharacters();
  const { sets, add: addSet, remove: removeSet } = useMySets();

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
              background-color: #000;
            }
          `}
        />
        <MyCharactersContext.Provider value={{ list, add, remove }}>
          <MySetsContext.Provider value={{ sets, add: addSet, remove: removeSet }}>
            <Container>
              <Route path="/" exact component={Home} />
              <Route path="/sets" exact component={SetSelect} />
              <Route path="/kana" component={Player} />
              <Route path="/custom" exact component={CharacterSelect} />
              <Route path="/my-characters" exact component={MyCharacters} />
            </Container>
          </MySetsContext.Provider>
        </MyCharactersContext.Provider>
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
