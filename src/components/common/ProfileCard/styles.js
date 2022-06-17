import styled, { css } from 'styled-components';
import { noSelect, shadowOutline } from 'shared/styles';

export const Container = styled.button`
    padding: 16px;
    background-color: transparent;
    width: 100%;
    outline: none;

    &:hover {
        cursor: ${({ hover }) => (hover && 'pointer')};
    }

    &:focus-visible {
        ${shadowOutline()}
    }
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
`;

export const ProfilePicture = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 24px;
    margin-right: 16px;
    ${noSelect}
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Username = styled.span`
    font-weight: bold;
    font-size: 18px;
    ${noSelect}
`;

export const Email = styled.span`
    font-size: 14px;
`;
