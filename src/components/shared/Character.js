import React from 'react';
import styled from '@emotion/styled';

export default function Character({ character, isSelected, onSelect }) {
  return (
    <CharacterContainer selected={isSelected} onClick={onSelect}>
      <Kana selected={isSelected}>{character.kana}</Kana>
      <Meaning selected={isSelected}>{character.meaning}</Meaning>
    </CharacterContainer>
  );
}

const CharacterContainer = styled('li')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.25em .5em;
  margin: 0.5em 1.5em;
  max-width: 130px;

  transition: background-color 0.15s ease;

  background-color: ${p => (p.selected ? 'white' : 'black')};

  &:hover {
    cursor: pointer;
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

const Kana = styled('div')`
  color: ${p => (p.selected ? 'black' : 'white')};
  font-size: 1.75rem;
  line-height: 1;
  padding-bottom: .25em;
`;

const Meaning = styled('div')`
  color: ${p => (p.selected ? 'black' : 'white')};
  font-size: 1rem;
  line-height: 1;
  text-align: center;
`;
