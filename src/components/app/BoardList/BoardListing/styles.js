import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const BoardListItem = styled.li`
    margin: 0 4px 16px 4px;
`;

export const ButtonStyle = css`
    display: block;
    height: 110px;
    width: 180px;
    padding: 16px;
    border: transparent;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;

    &:hover:enabled {
        cursor: pointer;
    }
`;

export const StarContainer = styled.div`
    position: absolute;
    bottom: 16px;
    right: -16px;
    transition: all .2s;
    opacity: ${({ starred }) => (starred ? 1 : 0)};
    color: ${({ starred }) => (starred ? '#ffd151' : 'white')};
    transform: ${({ starred }) => (starred && 'translateX(-32px)')};
    
    &:hover {
        color: ${({ starred }) => (starred ? '#f5bb1d' : '#d5d0f5')};
    }
`;

export const Star = styled(FontAwesomeIcon)`
    transition: transform .2s;
    &:hover {
        transform: scale(1.5);
    }
`;

export const BoardLink = styled.a`
    ${ButtonStyle}
    position: relative;
    background-color: #352092;
    color: white;
    text-decoration: none;

    &:hover {
        background-color: #28128d;

        ${StarContainer} {
            opacity: 1;
            transform: ${({ starred }) => (!starred && 'translateX(-32px)')};
        }
    }
`;

export const AddBoardButton = styled.button`
    ${ButtonStyle}
    background-color: transparent;
    border: 4px dashed #ccc;
    color: #888;

    &:hover:enabled {
        background-color: #f9f9f9;
    }
`;

