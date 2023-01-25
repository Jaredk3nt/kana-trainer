import React from 'react';
import useCharacterSets from '../../hooks/useCharacterSets';

import { PageContainer, Header, Anchor, Anchors } from '../shared';

export default function SetSelect() {
  const [characterSets] = useCharacterSets();

  return (
    <PageContainer>
      <Header>Select Training Set</Header>
      <Anchors>
        {Object.entries(characterSets).map(([key, { name, set }]) => (
          set.length ? <Anchor to={{ pathname: '/kana', search: `?sets=${key}` }}>
            {name}
          </Anchor> : null
        ))}
        {/* TODO: use icon */}
        <Anchor to='/' last>Home</Anchor>
      </Anchors>
    </PageContainer>
  );
}
