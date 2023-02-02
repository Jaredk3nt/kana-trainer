import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { parse } from 'query-string';
import Feather from 'feathered';

import {
  PageContainer,
  ContentContainer,
  PaddedContainer,
  Actions,
  ActionButton,
  Message,
  CharacterList,
} from '../shared';
import useCharacterSets from '../../hooks/useCharacterSets';

export default function ViewSet() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sets: characterSets, update, remove } = useCharacterSets();

  const [selectedCharacters, setSelectedCharacters] = useState([]);

  const qs = parse(location.search, { arrayFormat: 'comma' });
  const key = qs.set;
  const set = characterSets[key];


  // TODO: confirmation
  const handleRemove = () => {
    remove(key);
    navigate("/sets");
  }

  return (
    <PageContainer>
      <ContentContainer>
        <PaddedContainer>
          <Message>
            Manage your set or continue to study
          </Message>

          <TitleRow>
            <Title
              type="text"
              id="set-name-input"
              value={set.name}
              onChange={(e) => update(key, { name: e.target.value })}
            />

            <DeleteButton onClick={handleRemove}>
              <Feather icon="trash-2" size={24} />
            </DeleteButton>
          </TitleRow>
          <CharacterList
            set={set.set}
            selected={selectedCharacters}
            onChange={setSelectedCharacters}
          />
        </PaddedContainer>

        <Actions items={3}>
          <ActionButton as={Link} to="/">
            <Feather icon="home" color="#fff" size={32} />
          </ActionButton>
          <ActionButton onClick={() => {}} disabled={true}>
            <Feather icon="trash-2" size={32} />
          </ActionButton>
          <ActionButton last onClick={() => navigate({ pathname: '/kana', search: `?sets=${qs.set}` })}>
            <Feather
              icon="arrow-right"
              size={32}
            />
          </ActionButton>
        </Actions>
      </ContentContainer>
    </PageContainer>
  )
}

const TitleRow = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2em;
`;

const Title = styled('input')`
  color: white;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
  outline: none;
  border: 2px solid transparent;
  width: 75%;
  padding: .5em .5em .5em .25em;

  &:focus {
    border: 2px solid white;
  }
`;

const DeleteButton = styled('button')`
  color: white;
  background-color: black;
  border: 2px solid white;
  cursor: pointer;
  width: 25%;
  padding: .5em;
`;