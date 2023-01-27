import { hiragana, katakana, verbs1, animals, adjectives1, numbers } from "./data"

export const characterSets = {
  hiragana: {
    name: 'Hiragana',
    set: hiragana,
  },
  katakana: {
    name: 'Katakana',
    set: katakana,
  },
  numbers: {
    name: 'Kanji - Numbers',
    set: numbers,
  },
  verbs1: {
    name: 'Kanji - Verbs 1',
    set: verbs1,
  },
  adjectives1: {
    name: 'Kanji - Adjectives 1',
    set: adjectives1,
  },
  animals: {
    name: 'Kanji - Animals',
    set: animals,
  }
}

export const EMPTY_MESSAGE = 'おめでとうございます!';

export const KEYS = {
  enter: 13,
  space: 32,
  right: 39,
  f: 70,
  r: 82,
  s: 83,
};