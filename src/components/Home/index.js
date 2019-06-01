import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export default function Home({}) {
  return (
    <Anchors>
      <Anchor to={{ pathname: '/kana', search: '?sets=hiragana' }} first>
        Hiragana
      </Anchor>
      <Anchor to={{ pathname: '/kana', search: '?sets=katakana' }}>
        Katakana
      </Anchor>
      <Anchor
        to={{ pathname: '/kana', search: '?sets=hiragana,katakana' }}
        last
      >
        Combo
      </Anchor>
    </Anchors>
  );
}

const Anchors = styled('nav')`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Anchor = styled(Link)`
  width: 80%;
  border: 2px solid white;
  color: white;
  font-size: 1.75rem;
  text-align: center;
  padding: 1em;
  box-sizing: border-box;

  text-decoration: none;

  ${p => {
    if (p.first) {
      return 'border-bottom: none;';
    }
    if (p.last) {
      return 'border-top: none';
    }
  }}

  &:active,
  &:focus {
    background-color: white;
    color: black;
  }
`;
