import styled from 'styled-components';

export const Icon = styled.div`
    background-color: ${({ backgroundColor }) => backgroundColor || 'pink'};
    width: ${({ width }) => (width ? `${width}px` : '24px')};
    height: ${({ height }) => (height ? `${height}px` : '24px')};
    font-size: ${({ width }) => (width ? `${width / 2}px` : '12px')};
    line-height: ${({ height }) => (height ? `${height}px` : '24px')};
    font-family: Arial;
    color: #fff;
    text-align: center;
    border-radius: 6%;
    text-transform: uppercase;
`;
