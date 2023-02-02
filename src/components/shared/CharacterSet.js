import React from "react";
import styled from '@emotion/styled';

import { CharacterList } from ".";

export default function CharacterSet({ name, set, selected = [], onChange = () => {} }) {
  const toggleEntireSet = () => {
    if (selected.length === set.length) {
      onChange([]);
    } else {
      onChange(set.map((_, idx) => idx));
    }
  }

  return (
    <SetContainer>
      <SetTitle onClick={() => toggleEntireSet()}>
        {name}
      </SetTitle>

      <CharacterList set={set} selected={selected} onChange={onChange} />
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
