import React, { useMemo, useCallback } from 'react';
import { parse } from 'query-string';
import { withRouter } from 'react-router';
// Components
import Deck from '../Deck';
// Hooks
import useCharacterSets from '../../hooks/useCharacterSets';

function Player({ location }) {
  const [characterSets] = useCharacterSets();

  const createDeck = useCallback(() => {
    const qs = parse(location.search, { arrayFormat: 'comma' });

    const newDeck = [];

    Object.entries(qs).map(([key, value]) => {
      if (key === 'sets') {
        if (Array.isArray(qs.sets)) {
          qs.sets.forEach(setKey => {
            if (!characterSets[setKey]) return;
            newDeck.push(...characterSets[setKey].set);
          });
        } else {
          if (!characterSets[qs.sets]) return;
          newDeck.push(...characterSets[qs.sets].set);
        }

        return newDeck;
      } else {
          if (Array.isArray(value)) {
            value.forEach(cIndex => {
              if (cIndex >= characterSets[key].set.length) return;
              newDeck.push(characterSets[key].set[cIndex]);
            });
          } else {
            if (value >= characterSets[key].set.length) return;
            newDeck.push(characterSets[key].set[value]);
          }
      }
    });

    return newDeck;
  }, [characterSets, location.search]);

  const deck = useMemo(() => createDeck(), [createDeck]);

  return <Deck deck={deck} />;
}

export default withRouter(Player);
