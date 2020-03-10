import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { Spacer } from "./Shared/Spacer";

const ScoreboardContainer = styled("div")({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between"
});

const ScoreboardCounters = styled("div")({
  display: "flex",
  span: {
    fontWeight: 600,
    marginRight: "8px"
  }
});

const Scoreboard = ({ counter, showNewGame, onNewGameClick }) => {
  return (
    <ScoreboardContainer>
      <ScoreboardCounters>
        <div>
          <span>Player One:</span> {counter.playerOne}
        </div>
        <Spacer />
        <div>
          <span>Dealer:</span> {counter.dealer}
        </div>
        <Spacer />
        <div>
          <span>Push:</span> {counter.push}
        </div>
      </ScoreboardCounters>
      <div>
        {showNewGame && (
          <button type="button" onClick={onNewGameClick}>
            New Game
          </button>
        )}
      </div>
    </ScoreboardContainer>
  );
};

Scoreboard.propTypes = {
  counter: PropTypes.object.isRequired,
  showNewGame: PropTypes.bool.isRequired,
  onNewGameClick: PropTypes.func.isRequired
};

export { Scoreboard };
