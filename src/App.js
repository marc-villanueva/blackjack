import React, { useReducer } from "react";
import styled from "@emotion/styled";
import "./App.css";

import {
  Deck,
  PlayerHand,
  BlackJack,
  PLAYER_ONE,
  DEALER,
  PUSH
} from "./game/game";
import { PlayerBoard } from "./components/PlayerBoard/PlayerBoard";
import { NEW_GAME, HIT, STAY, newGame } from "./actions/actions";
import { Scoreboard } from "./components/Scoreboard";
import { WinnerBanner } from "./components/WinnerBanner";

function init() {
  const deck = new Deck();
  const playerOne = new PlayerHand(false, [deck.dealCard(), deck.dealCard()]);
  const dealer = new PlayerHand(true, [deck.dealCard(), deck.dealCard()]);

  return {
    deck: deck,
    playerOne: playerOne,
    dealer: dealer,
    winner: null,
    counter: {
      playerOne: 0,
      dealer: 0,
      push: 0
    }
  };
}

function calculateWinner(state) {
  state.winner = BlackJack.calculateWinner(state.playerOne, state.dealer);

  if (state.winner === PLAYER_ONE) {
    state.counter.playerOne++;
  }

  if (state.winner === DEALER) {
    state.counter.dealer++;
  }

  if (state.winner === PUSH) {
    state.counter.push++;
  }
}

function reducer(state, action) {
  switch (action.type) {
    case NEW_GAME:
      const initialState = { ...init(), counter: state.counter };
      calculateWinner(initialState);
      return initialState;
    case HIT:
      action.hand.addCard(state.deck.dealCard());
      calculateWinner(state);
      return { ...state };
    case STAY:
      action.hand.stay();
      calculateWinner(state);
      return { ...state };
    default:
      console.log("noop");
  }
}

export const AppContext = React.createContext({});

const PlayerHeader = styled("div")({
  padding: "16px",
  fontSize: "18px",
  fontWeight: 600
});

const Separator = styled("hr")({
  margin: 0
});

function App() {
  const [state, dispatch] = useReducer(reducer, null, init);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Scoreboard
          counter={state.counter}
          showNewGame={state.winner}
          onNewGameClick={() => dispatch(newGame())}
        />

        <Separator />

        {state.winner && <WinnerBanner winner={state.winner} />}

        <PlayerHeader>Player One</PlayerHeader>
        <PlayerBoard hand={state.playerOne}></PlayerBoard>
        {state.playerOne.isFinished && !state.playerOne.isBust && (
          <>
            <PlayerHeader>Dealer</PlayerHeader>
            <PlayerBoard hand={state.dealer}></PlayerBoard>
          </>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
