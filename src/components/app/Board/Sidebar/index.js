import styled from 'styled-components';
import { Container, Header, Title, Body, Content, CloseButton } from './styles';

const Pre = styled.pre`
    white-space: pre-wrap;
`;

export default function Sidebar({ isVisible, close, data }) {
    return (
        <Container>
            <Header>
                <Title>Menu</Title>
                <CloseButton onClick={close}>X</CloseButton>
            </Header>
            <Body>
                <Content>
                    <Pre>{JSON.stringify(data, null, 8)}</Pre>
                </Content>
            </Body>
        </Container>
    );
}
