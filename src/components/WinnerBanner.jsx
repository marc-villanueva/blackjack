import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { DEALER, PLAYER_ONE, PUSH } from "../game/game";

const Container = styled("div")({
  padding: "16px",
  backgroundColor: "green",
  color: "white",
  fontSize: "28px",
  fontWeight: 600,
  textAlign: "center"
});

const WinnerBanner = ({ winner }) => {
  return (
    <Container>
      {winner === DEALER && <div>Dealer Wins</div>}
      {winner === PLAYER_ONE && <div>Player One Wins</div>}
      {winner === PUSH && <div>Push</div>}
    </Container>
  );
};

WinnerBanner.propTypes = {
  winner: PropTypes.string.isRequired
};

export { WinnerBanner };
