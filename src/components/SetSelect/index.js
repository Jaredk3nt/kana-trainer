import React from 'react';
import { Link } from 'react-router-dom';
import Feather from 'feathered';

import useCharacterSets from '../../hooks/useCharacterSets';

import { PageContainer, Header2, Message, Pad, Anchor, Anchors, Actions, ActionButton, ContentContainer } from '../shared';

export default function SetSelect() {
  const [characterSets] = useCharacterSets();

  const characterSetArr = Object.entries(characterSets);

  return (
    <PageContainer>
      <ContentContainer>
        <Message>Select the training set you want to study or create your own</Message>
        <Pad />
        <Anchors>
          <Anchor to='/custom' last>Create Custom Set</Anchor>
        </Anchors>

        <Header2>Predefined Sets</Header2>
        <Anchors>
          
          {characterSetArr.map(([key, { name, set }], index) => (
            set.length
              ? (
                <Anchor
                  to={{ pathname: '/kana', search: `?sets=${key}` }}
                  last={index === characterSetArr.length - 1}
                >
                  {name}
                </Anchor>
              ) : null
          ))}
        </Anchors>

        <Actions items={1}>
          <ActionButton as={Link} to="/">
            <Feather icon="home" color="#fff" size={32} />
          </ActionButton>
        </Actions>
      </ContentContainer>
    </PageContainer>
  );
}
