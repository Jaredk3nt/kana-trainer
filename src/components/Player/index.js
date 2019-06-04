import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { withRouter } from 'react-router';
// Components
import Deck from '../Deck';
// Data
import kana from '../../data/kana';

function Player({ location }) {
  const [deck, setDeck] = useState(createDeck() || []);

  useEffect(() => {
    // Call create
    setDeck(createDeck());
  }, [location.search]);

  function createDeck() {
    const qs = parse(location.search, { arrayFormat: 'comma' });
    if (!qs.sets && !qs.hiragana && !qs.katakana) return [];

    if (qs.sets) {
      let newDeck = [];
      if (Array.isArray(qs.sets)) {
        qs.sets.forEach(set => {
          if (!kana[set]) return;
          newDeck.push(...kana[set]);
        });
      } else {
        if (!kana[qs.sets]) return;
        newDeck.push(...kana[qs.sets]);
      }
      return newDeck;
    }

    if (qs.hiragana || qs.katakana) {
      let newDeck = [];
      Object.entries(qs).forEach(([set, chars]) => {
        if (Array.isArray(chars)) {
          chars.forEach(cIndex => {
            if (cIndex >= kana[set].length) return;
            newDeck.push(kana[set][cIndex]);
          });
        } else {
          if (chars >= kana[set].length) return;
          newDeck.push(kana[set][chars]);
        }
      });
      return newDeck;
    }
  }

  return <Deck deck={deck} />;
}

export default withRouter(Player);
