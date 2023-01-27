import React from 'react';

import { PageContainer, Header, Anchor, Anchors, ContentContainer, PaddedContainer } from '../shared';

export default function Home() {
  return (
    <PageContainer>
      <ContentContainer>
        <PaddedContainer>
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
        </PaddedContainer>
      </ContentContainer>
    </PageContainer>
  );
}
