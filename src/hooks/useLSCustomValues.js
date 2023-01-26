import { useState, useEffect, useCallback } from 'react';
// Variables
const LS_KEY = 'custom-kana-trainer-values';

function useArrayState(initialArr = []) {
  const [arr, setArr] = useState(initialArr);

  const add = useCallback((item) => {
    console.log('updating state')
    setArr(prevArr => [...prevArr, item]);
  }, []);

  const remove = useCallback((index) => {
    setArr(prevArr => {
      console.log({ prevArr, index, newArr: prevArr.slice(0, index) + prevArr.slice(index + 1) });
      return [...prevArr.slice(0, index), ...prevArr.slice(index + 1, prevArr.length)];
    });
  }, []);

  return [arr, add, remove];
}

// TODO: make a way to make more custom sets
// TODO: make this a context value!!!!!!!
export default function useLSCustomValues() {
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
    console.log('updating list');
    window.localStorage.setItem(LS_KEY, JSON.stringify(list));
  }, [list]);

  console.log({ list })

  return { list, add, remove };
}
