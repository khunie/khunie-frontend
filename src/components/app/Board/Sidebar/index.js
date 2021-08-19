import { Container, SidebarHeader, SidebarBody, SidebarContent, CloseButton } from './styles';

export default function Sidebar({ isVisible, close }) {
    return (
        <Container>
            <SidebarHeader>
                <CloseButton onClick={close} />
            </SidebarHeader>
            <SidebarBody>
                <SidebarContent>
                    Hey there thsi is the sidebar what is going on dhfhdf
                    adkfa;lkdjfjkl;adljkfadsljkfl;jkadfl;jkasdl;kjalsk;jflk;jasdflk;asdljklkj;asfljk;asdljk
                </SidebarContent>
            </SidebarBody>
        </Container>
    );
}
