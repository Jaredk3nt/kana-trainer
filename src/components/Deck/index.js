import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useSpring, animated } from 'react-spring';
import Feather from 'feathered';
import { Link } from 'react-router-dom';
const EMPTY_MESSAGE = 'おめでとうございます!';

// TODO: add "edit" functionality to held
export default function Deck({ deck }) {
  const [reverse, setReverse] = useState(false);
  const [held, setHeld] = useState([]);
  const [previous, setPrevious] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(undefined);
  const { transform } = useSpring({
    transform: `perspective(600px) rotateY(${visible ? -180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80, duration: 300 },
  });

  function chooseRandomCard() {
    // if (deck.length <= 1) {
    //   return;
    // }
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
    if (deck.length <= 1) return;
    // set answer to invisible
    setVisible(false);
    // pick new (ensuring not in held or previous)
    const nextCard = chooseRandomCard();
    // assign old to previous
    setPrevious(current);
    setTimeout(() => {
      // assign new to current
      setCurrent(nextCard);
    }, 150);
  }

  function toggleAnswer() {
    setVisible(!visible);
  }

  function toggleReverse() {
    setReverse(!reverse);
  }

  function addHeld() {
    // add current to held list
    if (!current || held.findIndex(item => item.kana === current.kana) !== -1)
      return;
    if (deck.length === 1) {
      setHeld([...held, current]);
      return setCurrent(undefined);
    }
    setHeld([...held, current]);
    nextCard();
  }

  if (!current && deck.length && held.length < deck.length) {
    setCurrent(chooseRandomCard());
    // nextCard();
  }

  console.log({ held, previous, visible, current, deck });

  return (
    <Container>
      <View>
        <CenterContainer>
          {current ? (
            <>
              <Card
                onClick={toggleAnswer}
                style={{
                  transform: transform.interpolate(t => `${t} rotateX(180deg)`),
                }}
              >
                <Rotator>
                  <CardKana dim>{current.kana}</CardKana>
                  <CardSound>{current.sound}</CardSound>
                </Rotator>
              </Card>
              <Card
                onClick={toggleAnswer}
                style={{
                  transform,
                }}
              >
                <CardKana>{current.kana}</CardKana>
              </Card>
            </>
          ) : (
            <Message>{EMPTY_MESSAGE}</Message>
          )}
        </CenterContainer>
      </View>
      <Actions>
        <ActionButton as={Link} to="/">
          <Feather icon="home" color="#fff" size={32} />
        </ActionButton>
        <ActionButton onClick={addHeld}>
          <Feather icon="box" color="#fff" size={32} />
          {held.length}
        </ActionButton>
        <ActionButton onClick={toggleAnswer}>
          {visible ? (
            <Feather icon="eye-off" color="#fff" size={32} />
          ) : (
            <Feather icon="eye" color="#fff" size={32} />
          )}
        </ActionButton>
        <ActionButton last onClick={nextCard}>
          <Feather icon="arrow-right" color="#fff" size={32} />
        </ActionButton>
      </Actions>
    </Container>
  );
}

const Container = styled('div')`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 86px;
`;

const Actions = styled('nav')`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 2px solid white;
  margin: 0px 16px 16px;
`;

const ActionButton = styled('button')`
  background-color: transparent;
  color: white;
  border: none;
  font-size: 1.25rem;
  border-right: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;

  ${p =>
    p.last &&
    `
    border: none;
  `}

  transition: background-color .1s ease;

  &:active {
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
  position: relative;
`;

const Card = styled(animated.div)`
  background-color: black;
  width: 250px;
  height: 400px;
  box-sizing: border-box;
  border: 2px solid white;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: color 0.25s ease;
  will-change: transform, opacity;
  backface-visibility: hidden;
`;

const CardKana = styled('p')`
  font-size: 7rem;
  color: ${p => (p.dim ? 'black' : 'white')};
  margin: 0;
  line-height: 1;

  ${p =>
    p.dim &&
    `
  text-shadow:
   -1px -1px 0 #fff,  
    1px -1px 0 #fff,
    -1px 1px 0 #fff,
     1px 1px 0 #fff;
  `}
`;
const CardSound = styled('p')`
  font-size: 3rem;
  color: white;
  margin: 0;
  line-height: 1;
`;

const Rotator = styled('span')`
  transform: rotate(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Message = styled('p')`
  color: white;
  font-size: 1.5rem;
`;
