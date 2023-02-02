import React from 'react';
// Components
import Deck from './Deck';
// Hooks
import useBuildQueryDeck from '../../hooks/useQueryDeck';

function Player() {
  const deck = useBuildQueryDeck();

  return <Deck deck={deck} />;
}

export default Player;
