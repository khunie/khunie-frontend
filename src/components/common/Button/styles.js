import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledButton = styled.button`
    width: 100px;
    padding: 10px;
    border-radius: 6px;
    background-color: #453794;
    color: white;
    font-weight: bold;
    font-size: 14px;
    outline: none;
    // align-self: flex-start; // makes it so each button has its own individual width dependent on its content

    &:hover:enabled {
        cursor: pointer;
        background-color: #3c2e8b;
    }

    &:active:enabled {
        background-color: #352788;
    }

    &:disabled {
        background-color: #736ca0;
    }

    &:focus {
        box-shadow: 0px 0px 0px 2px #4b4c55;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: ${({ hasIcon }) => (hasIcon ? 'flex-start' : 'center')};
    align-items: center;

    ${({ center }) => (center && css`
        justify-content: center;
    `)}
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: 20px;
    margin-right: 4px;
    min-width: 20px;
`;
