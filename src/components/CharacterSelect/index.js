import React, { useState } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';
import Feather from 'feathered';
import { Link } from 'react-router-dom';
import useCharacterSets from '../../hooks/useCharacterSets';
import CustomCharacterInput from './CustomCharacterInput';

export default withRouter(function CharacterSelect({ history }) {
  const [characterSets] = useCharacterSets();
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState(Object.fromEntries(Object.keys(characterSets).map(key => [key, []])));


  function addCharacter(set, index) {
    setSelectedCharacters({
      ...selectedCharacters,
      [set]: [...selectedCharacters[set], index],
    });
  }

  function removeCharacter(set, index) {
    const cIdx = selectedCharacters[set].findIndex(item => item === index);
    setSelectedCharacters({
      ...selectedCharacters,
      [set]: [
        ...selectedCharacters[set].slice(0, cIdx),
        ...selectedCharacters[set].slice(cIdx + 1, selectedCharacters[set].length),
      ],
    });
  }

  function isSelected(set, index) {
    return selectedCharacters[set].includes(index);
  }

  function startPlayer() {
    history.push({
      pathname: '/kana',
      search: `?${Object.entries(selectedCharacters)
        .map(([set, chars]) => {
          return set + '=' + chars.join(',');
        })
        .filter(set => {
          const re = /\w+=(\d)(,\s*\d+)*/;
          return re.test(set);
        })
        .join('&')}`,
    });
  }

  function characterCount() {
    return Object.keys(selectedCharacters).reduce(
      (acc, set) => acc + selectedCharacters[set].length,
      0
    );
  }

  function toggleInput() {
    setInputVisible(!inputVisible);
  }

  return (
    <React.Fragment>
      <SelectContainer>
        <Message>
          Select the kana you want to show up in your training set, then click
          begin.
        </Message>

        {Object.entries(characterSets).map(([key, { name, set }]) => (
          <>
          <SetTitle>{name}</SetTitle>
          <CharacterList>
            {set.map((char, index) => {
              const selected = isSelected(key, index);
              return (
                <Character
                  character={char}
                  isSelected={selected}
                  onSelect={
                    selected
                      ? () => removeCharacter(key, index)
                      : () => addCharacter(key, index)
                  }
                />
              );
            })}
          </CharacterList>
        </>
        ))}
      </SelectContainer>

      <CustomCharacterInput isVisible={inputVisible} />

      <Actions>
        <Back to="/">
          <Feather icon="home" color="#fff" size={32} />
        </Back>
        <ActionButton onClick={toggleInput}>
          <Feather icon="edit" color="#fff" size={32} />
        </ActionButton>
        <ActionButton
          onClick={startPlayer}
          active={characterCount() > 0}
          disabled={characterCount() <= 0}
        >
          Begin
        </ActionButton>
      </Actions>
    </React.Fragment>
  );
});



const Message = styled('p')`
  color: rgba(255, 255, 255, 0.75);
  margin: 0.5em 1.5em 0em 1.5em;
`;

const SelectContainer = styled('main')`
  padding: 1.5em 1.5em 25% 1.5em;
  box-sizing: border-box;
  width: 100%;
  margin-top: 50%;

  @media (min-width: 800px) {
    margin-top: 0%;
  }
`;

const SetTitle = styled('h1')`
  color: white;
  text-transform: capitalize;
  margin: 0.5em 0.75em 0em 0.75em;
`;

const CharacterList = styled('ul')`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

const Actions = styled('nav')`
  position: fixed;
  display: grid;
  grid-template-columns: 25% 25% 1fr;
  bottom: 16px;
  left: 16px;
  width: calc(100% - 32px);
  background-color: white;

  height: 70px;
  box-sizing: border-box;
`;

const Back = styled(Link)`
  font-size: 1.2rem;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  background-color: black;
  box-sizing: border-box;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #eee;
  }
`;

const ActionButton = styled('button')`
  border: 2px solid white;
  border-left: none;
  font-size: 1.2rem;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  transition: background-color 0.5 ease;

  color: ${p => (p.active ? 'black' : '#bbb')};
  background-color: ${p => (p.active ? 'white' : 'black')};

  &:hover {
    cursor: pointer;
  }
  &:active {
    background-color: #eee;
    color: white;
  }
`;

function Character({ character, isSelected, onSelect }) {
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
  padding: 0.25em;
  margin: 0.5em;

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
`;

const Meaning = styled('div')`
  color: ${p => (p.selected ? 'black' : 'white')};
  font-size: 1.2rem;
  line-height: 1;
`;
