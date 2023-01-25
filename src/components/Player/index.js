import React, { useEffect, useState, useCallback } from 'react';
import { parse } from 'query-string';
import { withRouter } from 'react-router';
// Components
import Deck from '../Deck';
import useLSCustomValues from '../../hooks/useLSCustomValues';
// Data
import { hiragana, katakana, kanjiVerbs } from '../../data';

function Player({ location }) {
  const [customList] = useLSCustomValues();
  const [deck, setDeck] = useState([]);

  const createDeck = useCallback(() => {
    const kanaSet = { hiragana, katakana, kanjiVerbs, custom: customList };
    const qs = parse(location.search, { arrayFormat: 'comma' });
    if (!qs.sets && !qs.hiragana && !qs.katakana && !qs.kanjiVerbs && !qs.custom) return [];

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

    if (qs.hiragana || qs.katakana || qs.kanjiVerbs || qs.custom) {
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
  }, [customList, location.search]);

  useEffect(() => {
    // Call create
    setDeck(createDeck());
  }, [createDeck, location.search]);

  console.log({ deck })

  return <Deck deck={deck} />;
}

export default withRouter(Player);
