import React from "react";
import styled from '@emotion/styled';

import Character from "./Character";

export default function CharacterList({ setKey, name, set, selected = [], onChange = () => {} }) {
  const isSelected = (index) => {
    return selected.includes(index);
  }

  const toggleEntireSet = () => {
    if (selected.length === set.length) {
      onChange([]);
    } else {
      onChange(set.map((_, idx) => idx));
    }
  }

  const removeCharacter = (index) => {
    onChange(selected.filter((val) => val !== index));
  }

  const addCharacter = (index) => {
    onChange([...selected, index]);
  }

  // TODO: EMPTY STATE
  return (
    <>
      <SetTitle onClick={() => toggleEntireSet(setKey)}>
        {name}
      </SetTitle>

      <CharacterListContainer>
        {set.map((char, index) => {
          const selected = isSelected(index);
          
          return (
            <Character
              character={char}
              isSelected={selected}
              onSelect={
                selected
                  ? () => removeCharacter(index)
                  : () => addCharacter(index)
              }
            />
          );
        })}
      </CharacterListContainer>
    </>
  );
}

const SetTitle = styled('h1')`
  color: white;
  text-transform: capitalize;
  margin: 0.5em 0.75em 0em 0.75em;
`;

const CharacterListContainer = styled('ul')`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;