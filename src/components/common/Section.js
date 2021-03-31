/** @prettier */

import styled, { css } from 'styled-components';

const SectionContainer = styled.section`
    padding: 16px 0px;
    background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
`;

export const SectionContent = styled.div`
    max-width: 1460px;
    border-radius: 16px;
    padding: 128px 16px;
    box-sizing: border-box;
    margin: 0px auto;
    background-color: ${({ backgroundColor }) => backgroundColor || 'white'};
`;

export const Row = styled.div`
    display: flex;
    justify-content: center;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 16px;
`;

const textGradient = colors => css`
    background: linear-gradient(150deg, ${colors.toString()});
    background-size: auto;
    background-clip: border-box;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 100% auto;
    color: #000;
`;

export const Title = styled.h2`
    ${({ gradient }) => gradient && textGradient(gradient)}
    color: ${({ color }) => color};
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -2px;
    padding-bottom: 8px;
    margin-bottom: -8px;
`;

export const Subtitle = styled.h3`
    font-size: 20px;
    font-weight: bold;
    margin-top: 16px;
    color: ${({ color }) => color};
`;

export const SectionHeader = styled.div`
    margin: 0 auto 32px auto;
    width: 600px;
`;

export default function Section({ children, backgroundColor }) {
    return <SectionContainer backgroundColor={backgroundColor}>{children}</SectionContainer>;
}
