import React, { useContext, useState } from "react";
import { Link } from 'react-router-dom';
import Feather from 'feathered';

import myCharactersContext from "../../context/myCharactersContext";
import { PageContainer, PaddedContainer, Message, Actions, ActionButton, ContentContainer, CharacterSet, CustomCharacterInput } from '../shared';

export default function MyCharacters() {
  const { list, remove } = useContext(myCharactersContext);

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
          <CharacterSet setKey='custom' name="My Characters" set={list} selected={selected} onChange={setSelected} />

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