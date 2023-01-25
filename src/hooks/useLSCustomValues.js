import { useState, useEffect } from 'react';
// Variables
const LS_KEY = 'custom-kana-trainer-values';

function useArrayState(initialArr = []) {
  const [arr, setArr] = useState(initialArr);

  function add(item) {
    setArr(prevArr => [...prevArr, item]);
  }

  // TODO: actually make a way to remove them
  function remove(index) {
    setArr(prevArr => {
      return prevArr.slice(0, index) + prevArr.slice(index + 1, arr.length);
    });
  }

  return [arr, add, remove];
}

// TODO: make a way to make more custom sets
export default function useLSCustomValues() {
  const [list, add, remove] = useArrayState(() => {
    try {
      const ls = window.localStorage.getItem(LS_KEY);
      const val = ls ? JSON.parse(ls) : [];
      return val;
    } catch (err) {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem(LS_KEY, JSON.stringify(list));
  }, [list]);

  return [list, add, remove];
}
