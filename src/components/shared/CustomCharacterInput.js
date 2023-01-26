import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';

import useLSCustomValues from "../../hooks/useLSCustomValues";

export default function CustomCharacterInput({ isVisible }) {
  const [character, setCharacter] = useState('');
  const [meaning, setMeaning] = useState('');
  const [sound, setSound] = useState('');

  const { add } = useLSCustomValues();

  const styles = useSpring({
    opacity: isVisible ? '1' : '0',
    bottom: isVisible ? '102px' : '80px',
    config: { mass: 5, tension: 600, friction: 60 },
  });

  function clearInputs() {
    setCharacter('');
    setMeaning('');
    setSound('');
  }

  function addCustomCard() {
    add({ kana: character, meaning, sound });
    clearInputs();
  }

  return (
    <InputContainer style={styles}>
        <Input
          placeholder="Character"
          value={character}
          onChange={e => setCharacter(e.target.value)}
        />
        <Input
          placeholder="Meaning"
          value={meaning}
          onChange={e => setMeaning(e.target.value)}
        />
        <Input
          placeholder="Sound"
          value={sound}
          onChange={e => setSound(e.target.value)}
        />
        <InputButton
          disabled={!character || !meaning}
          onClick={addCustomCard}
          type='button'
        >
          Add
        </InputButton>
      </InputContainer>
  )
}

const InputContainer = styled(animated.div)`
  position: fixed;
  display: grid;
  grid-template-columns: repeat(4, 1fr);

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
  box-sizing: border-box;

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