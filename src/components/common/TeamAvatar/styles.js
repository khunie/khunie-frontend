import styled from 'styled-components';

export const Image = styled.img`
    width: ${({ width }) => (width ? `${width}px` : '24px')};
    height: ${({ height }) => (height ? `${height}px` : '24px')};
    object-fit: contain;
    border-radius: 6%;
`;
