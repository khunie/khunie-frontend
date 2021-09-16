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
                <BoardHeaderButton title="Board Title">{title}</BoardHeaderButton>
                <BoardHeaderButton title="Team Name">{teamName}</BoardHeaderButton>
                <BoardHeaderButton title="Board Visibility">{visibility}</BoardHeaderButton>
            </LeftSection>
            <RightSection>
                <BoardHeaderButton>{teamName}</BoardHeaderButton>
                {!isRightSidebarVisible && (
                    <BoardHeaderButton iconName="ellipsis-h" onClick={openRightSidebar}>
                        Show Menu
                    </BoardHeaderButton>
                )}
            </RightSection>
        </Container>
    );
}
