/** @prettier */

import styled, { css } from 'styled-components';
import Link from 'next/link';

const FooterContainer = styled.div`
    width: 100%;
    height: 100vh;
    padding: 32px 0px;
    background-color: #2a2086;
    display: flex;
    justify-content: center;
`;

const FooterColumn = styled.div`
    background-color: #2a2086;
    border-radius: 16px;
    width: 390px;
    margin: 0px 32px;
`;

export default function Footer() {
    return (
        <FooterContainer>
            <FooterColumn></FooterColumn>
            <FooterColumn></FooterColumn>
            <FooterColumn></FooterColumn>
        </FooterContainer>
    );
}
