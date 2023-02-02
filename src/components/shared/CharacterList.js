import React from "react";
import styled from '@emotion/styled';

import Character from "./Character";
import { Message } from ".";

export default function CharacterList({ set, selected = [], onChange = () => {} }) {
  const isSelected = (index) => {
    return selected.includes(index);
  }

  const removeCharacter = (index) => {
    onChange(selected.filter((val) => val !== index));
  }

  const addCharacter = (index) => {
    onChange([...selected, index]);
  }

  return set.length > 0
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
    )
  ;
}

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