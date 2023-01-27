import { useEffect } from 'react';

import useArrayState from './useArrayState';

// Variables
const LS_KEY = 'custom-kana-trainer-values';

// TODO: bulk remove fn
export default function useMyCharacters() {
  const [list, add, remove] = useArrayState(() => {
    try {
      const ls = window.localStorage.getItem(LS_KEY);
      const val = ls ? JSON.parse(ls) : [];
      return Array.isArray(val) ? val : [];
    } catch (err) {
      return [];
    }
  });

  // Write to local storage when list changes
  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(list));
  }, [list]);

  return { list, add, remove };
}
