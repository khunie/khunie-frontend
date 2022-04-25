import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    padding: 64px;
    border: 4px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 4px;
    margin: 8px 0 32px 0;
    text-align: center;
`;

export const Title = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #555;
`;

export const Subtitle = styled.p`
    font-size: 16px;
    color: #aaa;
    margin: 8px 4px;
`;

export const Image = styled.img`
    width: 100px;
    height: 100px;
    margin-bottom: 4px;
    opacity: .1;
`;
