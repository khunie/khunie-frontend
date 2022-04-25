import { shadowOutline } from 'shared/styles';
import styled from 'styled-components';

export const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: 4px;
    background-color: #453794;
    color: white;
    font-size: 14px;
    outline: none;
    // align-self: flex-start; // makes it so each button has its own individual width dependent on its content

    &:hover:enabled {
        background-color: #3c2e8b;
        ${shadowOutline()}
    }

    &:active {
        background-color: #352788;
    }

    &:disabled {
        background-color: #736ca0;
    }

    &:focus {
        ${shadowOutline()}
    }
`;

export const Content = styled.span`
    display: flex;
    justify-content: ${({ center }) => (center && 'center')};
    align-items: ${({ hasSubtitle }) => (hasSubtitle ? 'flex-start' : 'center')};
    width: 100%;
`;

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.span`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    font-weight: bold; 
    flex-wrap: wrap;
    width: 100%;
`;

export const Subtitle = styled.p`
    color: #888;
    font-weight: normal;
`;
