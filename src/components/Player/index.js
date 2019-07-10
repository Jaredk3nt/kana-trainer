import React, { useEffect, useState } from 'react';
import { parse } from 'query-string';
import { withRouter } from 'react-router';
// Components
import Deck from '../Deck';
import useLSCustomValues from '../../hooks/useLSCustomValues';
// Data
import kana from '../../data/kana';

function Player({ location }) {
  const [customList] = useLSCustomValues();
  const [deck, setDeck] = useState(createDeck() || []);

  useEffect(() => {
    // Call create
    setDeck(createDeck());
  }, [location.search]);

  function createDeck() {
    const kanaSet = { ...kana, custom: customList };
    const qs = parse(location.search, { arrayFormat: 'comma' });
    if (!qs.sets && !qs.hiragana && !qs.katakana && !qs.custom) return [];

    if (qs.sets) {
      let newDeck = [];
      if (Array.isArray(qs.sets)) {
        qs.sets.forEach(set => {
          if (!kanaSet[set]) return;
          newDeck.push(...kanaSet[set]);
        });
      } else {
        if (!kanaSet[qs.sets]) return;
        newDeck.push(...kanaSet[qs.sets]);
      }
      return newDeck;
    }

    if (qs.hiragana || qs.katakana || qs.custom) {
      let newDeck = [];
      Object.entries(qs).forEach(([set, chars]) => {
        if (Array.isArray(chars)) {
          chars.forEach(cIndex => {
            if (cIndex >= kanaSet[set].length) return;
            newDeck.push(kanaSet[set][cIndex]);
          });
        } else {
          if (chars >= kanaSet[set].length) return;
          newDeck.push(kanaSet[set][chars]);
        }
      });
      return newDeck;
    }
  }

  return <Deck deck={deck} />;
}

export default withRouter(Player);
