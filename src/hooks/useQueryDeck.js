import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
// Hooks
import useCharacterSets from './useCharacterSets';

export default function useBuildQueryDeck() {
  const location = useLocation();
  const { sets: characterSets } = useCharacterSets();

  return useMemo(() => {
    const qs = parse(location.search, { arrayFormat: 'comma' });

    console.log({ qs, characterSets })

    const newDeck = [];

    Object.entries(qs).forEach(([key, value]) => {
      if (key === 'sets') {
        if (Array.isArray(qs.sets)) {
          qs.sets.forEach(setKey => {
            if (!characterSets[setKey]) return;
            newDeck.push(...characterSets[setKey].set);
          });
        } else {
          console.log(characterSets[qs.sets]);
          if (characterSets[qs.sets]) {
            newDeck.push(...characterSets[qs.sets].set);
          }
        }

        return newDeck;
      } else {
          if (Array.isArray(value)) {
            value.forEach(cIndex => {
              if (cIndex >= characterSets[key].set.length) return;
              newDeck.push(characterSets[key].set[cIndex]);
            });
          } else {
            if (value < characterSets[key].set.length) {
              newDeck.push(characterSets[key].set[value]);
            }
          }
      }
    });

    return newDeck;
  }, [characterSets, location.search]);
}