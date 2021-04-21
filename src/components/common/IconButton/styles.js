import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 10px;
    border-radius: 6px;
    font-weight: bold;
    font-size: 14px;

    &:hover:enabled {
        cursor: pointer;
        background-color: #ddd;
    }

    &:active:enabled {
        background-color: #ccc;
    }
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: 20px;
`;
