import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';

export default function Deck({ deck }) {
  const [held, setHeld] = useState([]);
  const [previous, setPrevious] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const [next, setNext] = useState(undefined);
  const [transition, setTransition] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: transition ? .6 : 0,
    transform: `perspective(600px) rotateY(${transition ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80, duration: 300 },
  });

  function chooseRandomCard() {
    const activeSet = deck.filter(card => {
      if (current && current.kana === card.kana) {
        return false;
      }
      if (previous && previous.kana === card.kana) {
        return false;
      }
      if (held.findIndex(h => h.kana === card.kana) !== -1) {
        return false;
      }
      return true;
    });
    const nextIndex = Math.floor(Math.random() * activeSet.length);
    return activeSet[nextIndex];
  }

  function nextCard() {
    // set answer to invisible
    setVisible(false);
    // pick new (ensuring not in held or previous)
    const nextCard = chooseRandomCard();
    setTransition(true);
    setTimeout(() => {
      setCurrent(next);
      setNext(undefined);
      setTransition(false);
    }, 300);
    // assign old to previous
    setPrevious(current);
    // assign new to current
    setNext(nextCard);
  }

  function toggleAnswer() {
    setVisible(!visible);
  }

  function addHeld() {
    // add current to held list
    setHeld([...held, current]);
  }

  function removeHeld() {
    // remove index from held list
  }

  if (!current) {
    setCurrent(chooseRandomCard());
  }

  console.log({ held, previous, visible, current });

  return (
    <Container>
      {current && (
        <View>
          <CenterContainer>
            <Card
              rotator
              visible={transition}
              style={{ opacity: opacity.interpolate(o => 1 - o), transform }}
            >
              {current.kana}
            </Card>
            <Card visible={!transition} style={{ opacity: opacity.interpolate(o => 1 - o) }}>{next ? next.kana : current.kana}</Card>
            <Answer visible={visible}>{current.sound}</Answer>
          </CenterContainer>
        </View>
      )}
      <Actions>
        <ActionButton onClick={addHeld}>Hold</ActionButton>
        <ActionButton center onClick={toggleAnswer}>
          {visible ? 'Hide' : 'Show'}
        </ActionButton>
        <ActionButton onClick={nextCard}>Next</ActionButton>
      </Actions>
    </Container>
  );
}

const Container = styled('div')`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 75px;
`;

const Actions = styled('nav')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 2px solid white;
`;

const ActionButton = styled('button')`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1.25rem;

  ${p =>
    p.center &&
    `
    border-right: 2px solid white;
    border-left: 2px solid white;
  `}

  transition: background-color .1s ease;

  &:active,
  &:focus {
    background-color: white;
    color: black;
  }
`;

const View = styled('main')`
  width: 100%;
  height: 100%;
`;

const CenterContainer = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Card = styled(animated.div)`
  color: white;
  font-size: 7rem;
  padding: 0.75em 0.6em;
  border: 2px solid white;

  display: ${p => (p.visible ? 'flex' : 'none')};

  transition: color .25s ease;

  ${p => p.rotator && 'color: transparent;'}
`;

const Answer = styled('div')`
  color: white;
  opacity: ${p => (p.visible ? 1 : 0)};
  font-family: sans-serif;
  font-size: 4rem;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 0.1s ease;

  &:hover {
    cursor: pointer;
  }
`;
