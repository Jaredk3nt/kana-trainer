import React from 'react';

import { PageContainer, Header, Anchor, Anchors, ContentContainer } from '../shared';

export default function Home() {
  return (
    <PageContainer>
      <ContentContainer>
        <Header>Kana Trainer</Header>
        <Anchors>
          <Anchor to="/my-characters">
            My Characters
          </Anchor>
          <Anchor to={{ pathname: '/kana', search: '?sets=hiragana' }}>
            Hiragana
          </Anchor>
          <Anchor to={{ pathname: '/kana', search: '?sets=katakana' }} last>
            Katakana
          </Anchor>
        </Anchors>

        <Anchors>
          <Anchor to='/sets' last>All Sets</Anchor>
        </Anchors>
      </ContentContainer>
    </PageContainer>
  );
}
