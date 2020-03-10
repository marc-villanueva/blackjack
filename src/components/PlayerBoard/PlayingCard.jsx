import React from 'react';
import PropTypes from 'prop-types';

const PlayingCard = ({ card }) => {
    return (
        <>
            <img
                alt={card.toString()}
                src={`https://deckofcardsapi.com/static/img/${card.code}.png`}
            />
        </>
    );
};

PlayingCard.propTypes = {
    card: PropTypes.object.isRequired
};

export { PlayingCard };
