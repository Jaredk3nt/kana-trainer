import { useState } from 'react';
// Variables
const LS_KEY = 'custom-kana-trainer-values';

function useArrayState(initialArr = []) {
  const [arr, setArr] = useState(initialArr);

  function add(item) {
    const newArr = [...arr, item];
    setArr(newArr);
  }

  function remove(index) {
    const newArr = arr.slice(0, index) + arr.slice(index + 1, arr.length);
    setArr(newArr);
  }

  return [arr, add, remove];
}

export default function useLSCustomValues() {
  const [list, addToList, removeFromList] = useArrayState(() => {
    try {
      const ls = window.localStorage.getItem(LS_KEY);
      const val = ls ? JSON.parse(ls) : [];
      return val;
    } catch (err) {
      return [];
    }
  });

  function add(item) {
    try {
      addToList(item);
      window.localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to add custom item to localstorage');
    }
  }

  function remove(index) {
    try {
      removeFromList(index);
      window.localStorage.setItem(LS_KEY, JSON.stringify(list));
    } catch (err) {
      console.error('Failed to remove custom item from localstorage');
    }
  }

  return [list, add, remove];
}
