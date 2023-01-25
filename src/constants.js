import { hiragana, katakana, kanjiVerbs } from "./data"

export const characterSets = {
  hiragana: {
    name: 'Hiragana',
    set: hiragana,
  },
  katakana: {
    name: 'Katakana',
    set: katakana,
  },
  kanjiVerbs: {
    name: 'Kanji - Verbs 1',
    set: kanjiVerbs,
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