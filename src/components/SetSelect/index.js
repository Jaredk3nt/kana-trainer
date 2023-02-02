import React from 'react';
import { Link } from 'react-router-dom';
import Feather from 'feathered';

import useCharacterSets from '../../hooks/useCharacterSets';

import { PageContainer, Header2, Message, Pad, Anchor, Anchors, Actions, ActionButton, ContentContainer, PaddedContainer } from '../shared';

export default function SetSelect() {
  const { sets: characterSets } = useCharacterSets();

  const characterSetArr = Object.entries(characterSets);
  const presetSets = characterSetArr.filter(([, { custom }]) => !custom);
  const customSets = characterSetArr.filter(([, { custom }]) => custom);

  return (
    <PageContainer>
      <ContentContainer>
        <PaddedContainer>
          <Message>Select the training set you want to study or create your own</Message>
          <Pad />
          <Anchors>
            <Anchor to='/custom' last>Create Custom Set</Anchor>
          </Anchors>

          <Header2>My Sets</Header2>
          <Anchors>
            {customSets.map(([key, { name, set }], index) => (
              set.length
                ? (
                  <Anchor
                    to={{ pathname: '/set', search: `?set=${key}` }}
                    last={index === customSets.length - 1}
                  >
                    {name}
                  </Anchor>
                ) : null
            ))}
          </Anchors>

          <Header2>Predefined Sets</Header2>
          <Anchors>
            {presetSets.map(([key, { name, set }], index) => (
              set.length
                ? (
                  <Anchor
                    to={{ pathname: '/kana', search: `?sets=${key}` }}
                    last={index === presetSets.length - 1}
                  >
                    {name}
                  </Anchor>
                ) : null
            ))}
          </Anchors>
        </PaddedContainer>

        <Actions items={1}>
          <ActionButton as={Link} to="/">
            <Feather icon="home" color="#fff" size={32} />
          </ActionButton>
        </Actions>
      </ContentContainer>
    </PageContainer>
  );
}
