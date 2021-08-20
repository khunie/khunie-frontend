import { Container, Header, Title, Body, Content, CloseButton } from './styles';

export default function Sidebar({ isVisible, close }) {
    return (
        <Container>
            <Header>
                <Title>Menu</Title>
                <CloseButton onClick={close}>X</CloseButton>
            </Header>
            <Body>
                <Content>
                    Hey there thsi is the sidebar what is going on dhfhdf
                    adkfa;lkdjfjkl;adljkfadsljkfl;jkadfl;jkasdl;kjalsk;jflk;jasdflk;asdljklkj;asfljk;asdljk
                </Content>
            </Body>
        </Container>
    );
}
