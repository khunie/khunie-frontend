import { Container, LeftSection, RightSection, BoardHeaderButton } from './styles';

export default function BoardHeader({
    title,
    teamName,
    visibility,
    isRightSidebarVisible,
    openRightSidebar,
}) {
    return (
        <Container>
            <LeftSection>
                <BoardHeaderButton>{title}</BoardHeaderButton>
                <BoardHeaderButton>{teamName}</BoardHeaderButton>
                <BoardHeaderButton>Visibility: {visibility}</BoardHeaderButton>
            </LeftSection>
            <RightSection>
                <BoardHeaderButton>{teamName}</BoardHeaderButton>
                {!isRightSidebarVisible && (
                    <BoardHeaderButton icon="ellipsis-h" onClick={openRightSidebar}>
                        Show Menu
                    </BoardHeaderButton>
                )}
            </RightSection>
        </Container>
    );
}
