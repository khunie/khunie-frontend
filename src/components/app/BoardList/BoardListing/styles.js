import styled, { css } from 'styled-components';
import { Icon } from 'components/common';

export const BoardListItem = styled.li`

`;

export const ButtonStyle = css`
    display: block;
    height: 110px;
    padding: 16px;
    border: transparent;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;

    &:hover:enabled {
        cursor: pointer;
    }
`;

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ background }) => (background?.color || '#3657e7')};
    background-size: cover;
    background-repeat: no-repeat;

    ${({ background }) => (background?.type === 'IMAGE' && css`
            background-image: url(${background.src});
        `
    )}
`;

export const Title = styled.h4`
    word-wrap: break-word;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateZ(0);
`;

export const TeamName = styled.p`
    position: absolute;
    bottom: 16px;
    left: 16px;
    color: #bcb1e4;
    font-weight: normal;
    font-size: 12px;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-font-smoothing: subpixel-antialiased;
    transform: translateZ(0);
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

export const Star = styled(Icon)`
    font-size: 16px;
    transition: transform .2s;
    &:hover {
        transform: scale(1.5);
    }
`;

export const BoardLink = styled.a`
    ${ButtonStyle}
    position: relative;
    color: white;
    text-decoration: none;
    transition: transform .2s;
    backface-visibility: hidden;


    &:hover {
        transform: scale(1.025) translateZ(0);

        ${StarContainer} {
            opacity: 1;
            transform: ${({ starred }) => (!starred && 'translateX(-32px)')};
        }

        ${Background} {
            filter: brightness(.9);
        }
    }
`;

export const AddBoardButton = styled.button`
    ${ButtonStyle}
    width: 100%;
    background-color: white;
    border: 4px dashed #ccc;
    color: #888;

    &:hover:enabled {
        background-color: #f9f9f9;
    }
`;
