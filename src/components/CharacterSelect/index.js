import React, { useState } from 'react';
import styled from '@emotion/styled';
import { withRouter } from 'react-router';
import Feather from 'feathered';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import useLSCustomValues from '../../hooks/useLSCustomValues';
// Data
import kana from '../../data/kana';

export default withRouter(function CharacterSelect({ history }) {
  const [customList, addCustom] = useLSCustomValues();
  const [inputVisible, setInputVisible] = useState(false);
  const [frontInput, setFrontInput] = useState('');
  const [backInput, setBackInput] = useState('');
  const [characters, setCharacter] = useState({
    hiragana: [],
    katakana: [],
    custom: [],
  });
  const styles = useSpring({
    opacity: inputVisible ? '1' : '0',
    bottom: inputVisible ? '102px' : '80px',
    config: { mass: 5, tension: 600, friction: 60 },
  });

  function addCharacter(set, index) {
    setCharacter({
      ...characters,
      [set]: [...characters[set], index],
    });
  }

  function removeCharacter(set, index) {
    const cIdx = characters[set].findIndex(item => item === index);
    setCharacter({
      ...characters,
      [set]: [
        ...characters[set].slice(0, cIdx),
        ...characters[set].slice(cIdx + 1, characters[set].length),
      ],
    });
  }

  function isSelected(set, index) {
    return characters[set].includes(index);
  }

  function startPlayer() {
    history.push({
      pathname: '/kana',
      search: `?${Object.entries(characters)
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
    return Object.keys(characters).reduce(
      (acc, set) => acc + characters[set].length,
      0
    );
  }

  function toggleInput() {
    setInputVisible(!inputVisible);
  }

  function addCustomCard() {
    addCustom({ kana: frontInput, sound: backInput });
    setFrontInput('');
    setBackInput('');
  }

  return (
    <>
      <SelectContainer>
        <Message>
          Select the kana you want to show up in your training set, then click
          begin.
        </Message>
        {customList.length > 0 && (
          <>
            <SetTitle>Custom</SetTitle>
            <CharacterList>
              {customList.map((char, index) => {
                const selected = isSelected('custom', index);
                return (
                  <Character
                    character={{ kana: char.kana, sound: char.sound }}
                    isSelected={selected}
                    onSelect={
                      selected
                        ? () => removeCharacter('custom', index)
                        : () => addCharacter('custom', index)
                    }
                  />
                );
              })}
            </CharacterList>
          </>
        )}
        {Object.entries(kana).map(([set, chars]) => (
          <>
            <SetTitle>{set}</SetTitle>
            <CharacterList>
              {chars.map((char, index) => {
                const selected = isSelected(set, index);
                return (
                  <Character
                    character={char}
                    isSelected={selected}
                    onSelect={
                      selected
                        ? () => removeCharacter(set, index)
                        : () => addCharacter(set, index)
                    }
                  />
                );
              })}
            </CharacterList>
          </>
        ))}
      </SelectContainer>
      <InputContainer style={styles}>
        <Input
          placeholder="Front"
          value={frontInput}
          onChange={e => setFrontInput(e.target.value)}
        />
        <Input
          placeholder="Back"
          value={backInput}
          onChange={e => setBackInput(e.target.value)}
        />
        <InputButton
          disabled={!frontInput || !backInput}
          onClick={addCustomCard}
          type='button'
        >
          Add
        </InputButton>
      </InputContainer>

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
    </>
  );
});

const InputContainer = styled(animated.div)`
  position: fixed;
  display: grid;
  grid-template-columns: 1fr 1fr 25%;

  left: 16px;
  width: calc(100% - 32px);
  max-width: calc(100% - 32px);
  background-color: black;

  height: 90px;
  box-sizing: border-box;
`;

const Input = styled('input')`
  background-color: black;
  border: 2px solid white;
  border-right: none;
  padding: 16px;
  color: white;
  font-size: 1.2rem;
  width: 100%;
  display: block;

  &::placeholder {
    color: white;
    font-size: 1.2rem;
  }

  &:focus {
    background-color: white;
    color: black;

    &::placeholder {
      color: #333;
    }
  }
`;

const InputButton = styled('button')`
  border: 2px solid white;
  border-left: 2px solid black;
  font-size: 1.2rem;
  background-color: white;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    color: #bbb;
    background-color: black;
    border-left: 2px solid white;
  }
`;

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
      <Sound selected={isSelected}>{character.sound}</Sound>
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

const Sound = styled('div')`
  color: ${p => (p.selected ? 'black' : 'white')};
  font-size: 1.2rem;
  line-height: 1;
`;
