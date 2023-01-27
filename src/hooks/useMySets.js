import { useCallback, useEffect, useState } from 'react';

// Variables
const LS_KEY = 'custom-kana-training-sets';

export default function useMySets() {
  const [sets, setSets] = useState(() => {
    try {
      const ls = window.localStorage.getItem(LS_KEY);
      const val = ls ? JSON.parse(ls) : {};
      return val || {};
    } catch (err) {
      return {};
    }
  });

  // Write to local storage when list changes
  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(sets));
  }, [sets]);

  const add = useCallback((name, set) => {
    setSets(prev => ({
      ...prev,
      [name.toLowerCase().split('\\s+').join('-')]: {
        name,
        set,
        custom: true,
      }
    }))
  }, [setSets]);

  const remove = useCallback((removeKey) => {
    setSets(prev => Object.fromEntries(
      Object.entries(prev).filter(([key]) => key !== removeKey)
    ))
  }, [setSets])

  return { sets, add, remove };
}
