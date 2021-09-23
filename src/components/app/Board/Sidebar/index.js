import styled from 'styled-components';
import { Stack } from 'components/common';
import { Container, Header, Title, Body, Content, CloseButton } from './styles';
import SidebarPage from './SidebarPage';

const MainPage = styled.div`
    height: 2000px;
    width: 100%;
    background-color: pink;
    padding: 8px;
`;

export default function Sidebar({ isVisible, close, data }) {
    return (
        <Container isVisible={isVisible}>
            <Stack headerRight={() => <CloseButton onClick={close}>X</CloseButton>}>
                <Stack.Screen name="Page 1" title="Menu">
                    <SidebarPage>
                        <div>page1</div>
                    </SidebarPage>
                </Stack.Screen>
                <Stack.Screen name="Page 2" title="Page 2">
                    <SidebarPage>
                        <div>page 2</div>
                    </SidebarPage>
                </Stack.Screen>
                <Stack.Screen name="Page 3" title="Page 3">
                    <SidebarPage>
                        <div>page 3</div>
                    </SidebarPage>
                </Stack.Screen>
            </Stack>
        </Container>
    );
}
