import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Feather from 'feathered';

import useLSCustomValues from "../../hooks/useLSCustomValues";

import { PageContainer, PaddedContainer, Message, Actions, ActionButton, ContentContainer, CharacterList, CustomCharacterInput } from '../shared';

export default function MyCharacters() {
  const { list, remove } = useLSCustomValues();

  const [inputVisible, setInputVisible] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleInput = () => {
    setInputVisible(prev => !prev);
  }

  const deleteCharacters = () => {
    selected.forEach((idx) => remove(idx));
    setSelected([]);
  }

  return (
    <PageContainer>
      <ContentContainer>
        <PaddedContainer>
          <Message>Add and manage custom characters you want to study</Message>
          <CharacterList setKey='custom' name="My Characters" set={list} selected={selected} onChange={setSelected} />

          <CustomCharacterInput isVisible={inputVisible} />
        </PaddedContainer>

        <Actions items={3}>
          <ActionButton as={Link} to="/">
            <Feather icon="home" size={32} />
          </ActionButton>
          <ActionButton onClick={toggleInput}>
            <Feather icon="edit" size={32} />
          </ActionButton>
          <ActionButton onClick={deleteCharacters} active={selected.length > 0} disabled={selected.length === 0}>
            <Feather icon="trash-2" size={32} />
            {selected.length > 0 && `(${selected.length})`}
          </ActionButton>
        </Actions>
      </ContentContainer>
    </PageContainer>
  );
}