import styled, { css } from 'styled-components';
import { Icon } from 'components/common';
import { shadowOutline } from 'shared/styles';

export const BoardListItem = styled.li`

`;

export const ButtonStyle = css`
    display: block;
    position: relative;
    height: 110px;
    padding: 16px;
    border: transparent;
    border-radius: 6px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
    overflow: hidden;
    outline: none;

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
    z-index: -1;

    ${({ background }) => (background?.type === 'IMAGE' && css`
            background-image: url(${background.src});
        `
    )}
`;

export const Title = styled.h4`
    word-wrap: break-word;
`;

export const TeamName = styled.p`
    position: absolute;
    bottom: 16px;
    left: 16px;
    color: #ffffff;
    opacity: .8;
    font-weight: normal;
    font-size: 12px;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-font-smoothing: subpixel-antialiased;
`;

export const StarContainer = styled.div`
    position: absolute;
    bottom: 16px;
    right: -16px;
    transition: all .2s;
    opacity: ${({ starred }) => (starred ? 1 : 0)};
    color: ${({ starred }) => (starred ? '#ffd151' : 'white')};
    transform: ${({ starred }) => (starred && 'translateX(-32px)')};
    filter: drop-shadow(0 0 3px #888);    

    &:hover {
        color: ${({ starred }) => (starred ? '#f5bb1d' : '#ffffffcc')};
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
    color: white;
    text-decoration: none;
    transition: transform .2s;

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

    &:focus {
        ${shadowOutline({ width: 3 })}
    }
`;

export const AddBoardButton = styled.button`
    ${ButtonStyle}
    width: 100%;
    background-color: transparent;
    border: 4px dashed #ccc;
    color: #888;
    transition: transform .1s;

    &:hover:enabled {
        background-color: #00000008;
        transform: scale(1.01) translateZ(0);
    }

    &:focus {
        border-color: #5c9cf0;
        color: #5c9cf0;
        transform: scale(1.01) translateZ(0);
    }
`;
