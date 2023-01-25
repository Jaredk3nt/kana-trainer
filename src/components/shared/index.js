import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const PageContainer = styled('div')`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Header = styled('h1')`
  margin: 0em 0em 1em;
  color: white;
  text-align: center;
`;

export const Anchors = styled('nav')`
  display: flex;
  flex-direction: column;
  align-items: center;
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