import styled from 'styled-components';
import { noSelect } from 'shared/styles';

export const Container = styled.div`
    padding: 16px;
    border-bottom: 1px solid #e5e5e5;

    &:hover {
        cursor: ${({ hover }) => (hover && 'pointer')};
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
