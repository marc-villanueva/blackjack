import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { AppContext } from '../../App';
import { StackSm } from '../Shared/Stack';

const Container = styled('div')({
    padding: '16px',
    minWidth: '150px'
});

const MenuButton = styled('button')({
    width: '100%',
    padding: '8px'
});

const Menu = ({ hand, items }) => {
    const { dispatch } = useContext(AppContext);

    return (
        <Container>
            {items.map((item, index) => (
                <div key={index}>
                    <MenuButton
                        type="button"
                        disabled={item.isDisabled(hand)}
                        onClick={() => dispatch(item.action(hand))}
                    >
                        {item.label}
                    </MenuButton>
                    <StackSm />
                </div>
            ))}
            <div>Score: {hand.score}</div>
        </Container>
    );
};

Menu.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            action: PropTypes.func.isRequired,
            isDisabled: PropTypes.func.isRequired
        })
    ).isRequired,
    hand: PropTypes.object.isRequired
};

export { Menu };
