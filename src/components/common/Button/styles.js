import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #453794;
    color: white;
    font-size: 14px;
    font-weight: bold;
    outline: none;
    // align-self: flex-start; // makes it so each button has its own individual width dependent on its content

    &:hover:enabled {
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

export const Content = styled.span`
    display: flex;
    align-items: center;
    width: 100%;
`;

export const LeftIcon = styled(FontAwesomeIcon)`
    font-size: ${({ $size }) => ($size ? `${$size}px` : '20px')};
    margin-right: 4px;
    min-width: ${({ $minWidth }) => ($minWidth ? `${$minWidth}px` : '20px')};
`;

export const RightIcon = styled(FontAwesomeIcon)`
    font-size: 14px;
    margin-left: auto;
    min-width: 20px;
`;
