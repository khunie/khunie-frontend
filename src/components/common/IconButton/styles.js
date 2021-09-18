import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 4px;
    font-weight: bold;
    outline: none;

    &:hover:enabled {
        background-color: #eee;
    }

    &:active:enabled {
        background-color: #ddd;
    }
    
    &:focus {
        box-shadow: 0px 0px 0px 2px #4a5297;
    }
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: ${({ size }) => (size ? `${size}px` : '20px')};

    ${({ style }) => (style && style)}
`;
