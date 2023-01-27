import React from "react";
import styled from '@emotion/styled';

import Character from "./Character";
import { Message } from ".";

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

  return (
    <SetContainer>
      <SetTitle onClick={() => toggleEntireSet(setKey)}>
        {name}
      </SetTitle>

      {set.length > 0
        ? (
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
        ) : (
          <EmptyMessageContainer>
            <Message>
              ここは寂しいです
            </Message>
          </EmptyMessageContainer>
        )}
    </SetContainer>
  );
}

const SetContainer = styled('div')`
  margin-bottom: 2em;
`;

const SetTitle = styled('h1')`
  color: white;
  text-transform: capitalize;
  margin: 0em 0em .5em;
  display: inline-block;
  cursor: pointer;
`;

const CharacterListContainer = styled('ul')`
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const EmptyMessageContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
`;