import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { hit, stay, newGame } from "../../actions/actions";

import { Menu } from "./Menu";
import { PlayingCard } from "./PlayingCard";
import { Spacer } from "../Shared/Spacer";
import { Stack } from "../Shared/Stack";

const menuItems = [
  {
    label: "Hit",
    action: hit,
    isDisabled: hand => {
      return hand.isFinished;
    }
  },
  {
    label: "Stay",
    action: stay,
    isDisabled: hand => {
      return hand.isDealer ? true : hand.isFinished;
    }
  },
  {
    label: "New Game",
    action: newGame,
    isDisabled: hand => {
      return !hand.isBust;
    }
  }
];

const Container = styled("div")({
  display: "flex"
});

const CardsContainer = styled("div")({
  padding: "16px",
  display: "flex"
});

const Header = ({ bgColor, children }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: "#ffffff",
        fontSize: "18px",
        fontWeight: 600,
        textAlign: "center",
        padding: "16px"
      }}
    >
      {children}
    </div>
  );
};

const PlayerBoard = ({ hand }) => {
  return (
    <div>
      {hand.isFinished && (
        <>
          {hand.isBust && (
            <>
              <Header bgColor="red">Bust!</Header>
              <Stack />
            </>
          )}
          {hand.isBlackJack && (
            <>
              <Header bgColor="green">Black Jack!</Header>
              <Stack />
            </>
          )}
        </>
      )}
      <Container>
        <CardsContainer>
          {hand.cards.map(card => (
            <Fragment key={card.code}>
              <PlayingCard card={card} />
              <Spacer />
            </Fragment>
          ))}
        </CardsContainer>
        <Menu items={menuItems} hand={hand}></Menu>
      </Container>
    </div>
  );
};

PlayerBoard.propTypes = {
  hand: PropTypes.object.isRequired
};

export { PlayerBoard };
