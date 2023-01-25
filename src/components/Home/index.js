import React from 'react';

import { PageContainer, Header, Anchor, Anchors } from '../shared';

export default function Home() {
  return (
    <PageContainer>
      <Header>Kana Trainer</Header>
      <Anchors>
        <Anchor to={{ pathname: '/kana', search: '?sets=custom' }}>
          My Characters
        </Anchor>
        <Anchor to={{ pathname: '/kana', search: '?sets=hiragana' }}>
          Hiragana
        </Anchor>
        <Anchor to={{ pathname: '/kana', search: '?sets=katakana' }}>
          Katakana
        </Anchor>
        <Anchor to='/custom'>Create Custom Set</Anchor>
        <Anchor to='/sets' last>All Sets</Anchor>
      </Anchors>
    </PageContainer>
  );
}
