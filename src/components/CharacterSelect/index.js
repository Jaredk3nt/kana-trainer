import React, { useMemo, useState } from 'react';
import { withRouter } from 'react-router';
import Feather from 'feathered';
import { Link } from 'react-router-dom';

import useCharacterSets from '../../hooks/useCharacterSets';
import { PageContainer, ContentContainer, Message, Actions, ActionButton, CharacterList, CustomCharacterInput } from '../shared';

export default withRouter(function CharacterSelect({ history }) {
  const [characterSets] = useCharacterSets();
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedCharacters, setSelectedCharacters] = useState(Object.fromEntries(Object.keys(characterSets).map(key => [key, []])));

  function startPlayer() {
    history.push({
      pathname: '/kana',
      search: `?${Object.entries(selectedCharacters)
        .map(([set, chars]) => {
          return set + '=' + chars.join(',');
        })
        .filter(set => {
          const re = /\w+=(\d)(,\s*\d+)*/;
          return re.test(set);
        })
        .join('&')}`,
    });
  }

  function characterCount() {
    return Object.keys(selectedCharacters).reduce(
      (acc, set) => acc + selectedCharacters[set].length,
      0
    );
  }

  function toggleInput() {
    setInputVisible(!inputVisible);
  }

  const handleSetChange = (key) => {
    return (update) => {
      console.log({ key, update });
      setSelectedCharacters((prev) => ({
        ...prev,
        [key]: update,
      }))
    };
  }

  const totalSelected = useMemo(() => Object.values(selectedCharacters).flat().length, [selectedCharacters]);

  return (
    <PageContainer>
      <ContentContainer>
        <Message>
          Select the kana you want to show up in your training set, then click
          begin.
        </Message>

        {Object.entries(characterSets).map(([key, { name, set }]) => (
          <CharacterList
            setKey={key}
            name={name}
            set={set}
            selected={selectedCharacters[key]}
            onChange={handleSetChange(key)}
          />
        ))}

      <CustomCharacterInput isVisible={inputVisible} />

      <Actions items={3}>
        <ActionButton as={Link} to="/">
          <Feather icon="home" color="#fff" size={32} />
        </ActionButton>
        <ActionButton onClick={toggleInput}>
          <Feather icon="edit" color="#fff" size={32} />
        </ActionButton>
        <ActionButton
          onClick={startPlayer}
          active={characterCount() > 0}
          disabled={characterCount() <= 0}
        >
          Begin ({totalSelected})
        </ActionButton>
      </Actions>
      </ContentContainer>
    </PageContainer>
  );
});
