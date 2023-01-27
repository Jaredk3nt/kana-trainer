import { useState, useCallback } from 'react';

export default function useArrayState(initialArr = []) {
  const [arr, setArr] = useState(initialArr);

  const add = useCallback((item) => {
    setArr(prevArr => [...prevArr, item]);
  }, []);

  const remove = useCallback((index) => {
    setArr(prevArr => {
      return [...prevArr.slice(0, index), ...prevArr.slice(index + 1, prevArr.length)];
    });
  }, []);

  return [arr, add, remove];
}