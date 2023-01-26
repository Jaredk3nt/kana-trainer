// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { animated } from 'react-spring';

export { default as Character } from './Character';
export { default as CharacterList } from './CharacterList';
export { default as CustomCharacterInput } from './CustomCharacterInput';

export const Pad = styled('div')`
  height: 1em;
`

export const PageContainer = styled('div')`
  height: 100vh;
  width: 100vw;
`;

export const ContentContainer = styled('div')`
  width: 100%;  
  max-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: scroll;
  padding: 25% 0px 35%;
`;

export const Header = styled('h1')`
  margin: 0em 0em 1em;
  color: white;
  text-align: center;
`;

export const Header2 = styled('h2')`
  margin: 0em 0em 1em;
  color: white;
  text-align: center;
  letter-spacing: 1px;
`;

export const Message = styled('p')`
  color: rgba(255, 255, 255, 0.75);
  margin: 0.5em 1.5em 0em 1.5em;
`;

export const Anchors = styled('nav')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2em;
`;

export const Anchor = styled(Link)`
  width: 80%;
  border-left: 2px solid white;
  border-right: 2px solid white;
  border-top: 2px solid white;
  color: white;
  font-size: 1.75rem;
  text-align: center;
  padding: 1em;
  box-sizing: border-box;

  text-decoration: none;

  ${p => {
    if (p.last) {
      return 'border-bottom: 2px solid white;';
    }
  }}

  &:active,
  &:focus {
    background-color: white;
    color: black;
  }

  ${p =>
    p.disabled &&
    `
    background-color: #333;
    color: #999;
    pointer-events: none;
    `}

  .subtext {
    font-size: 0.85rem;
    color: #999;
    margin: 0.1em 0em 0em;
  }
`;

export const Actions = styled('nav')`
  display: grid;
  grid-template-columns: repeat(${p => p.items || 4}, 1fr);
  border: 2px solid white;
  margin: 0px 16px;
  z-index: 9;
  position: fixed;
  width: calc(100% - 36px);
  bottom: 16px;
`;

export const ActionButton = styled('button')`
  position: relative;
  background-color: transparent;
  color: ${p => p.active ? 'black' : 'white'};
  background-color: ${p => p.active ? 'white' : 'black'};
  border: none;
  font-size: 1.25rem;
  border-right: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 67px;
  box-sizing: border-box;
  width: 100%;

  ${p => p.vertical && `border-right: none; border-top: 2px solid white;`}

  ${p => p.last && `border: none;`}

  transition: background-color .1s ease;

  &:active {
    background-color: white;
    color: black;
  }

  &:disabled {
    color: #ffffff33;
    background-color: black;
  }
`;

export const MoreActions = styled(animated.nav)`
  position: absolute;
  bottom: 100%;
  width: calc(25% - 2px);
  border: 2px solid white;
  left: -2px;
`;