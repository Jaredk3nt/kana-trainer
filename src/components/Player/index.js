import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { withRouter } from 'react-router';
// Components
import Deck from '../Deck';
// Data
import kana from '../../data/kana';

function Player({ location }) {
  const [deck, setDeck] = useState(createDeck());
  useEffect(() => {
    console.log('effect')
    // Call create
    setDeck(createDeck());
  }, [location.search]);

  function createDeck() {
    const qs = parse(location.search, { arrayFormat: 'comma' });
    if (!qs.sets) return;
    let newDeck = [];
    if (Array.isArray(qs.sets)) {
      qs.sets.forEach(set => {
        if (!kana[set]) return;
        newDeck.push(...kana[set]);
      })
    } else {
      if (!kana[qs.sets]) return;
      newDeck.push(...kana[qs.sets]);
    }
    return newDeck;
  }

  return <Deck deck={deck} />;
}

export default withRouter(Player);
