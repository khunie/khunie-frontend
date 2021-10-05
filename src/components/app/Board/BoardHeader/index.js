import {
    Container,
    LeftSection,
    RightSection,
    BoardHeaderButton,
    BoardHeaderField,
} from './styles';

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
                <BoardHeaderField
                    title="Board Title"
                    initialValue={title}
                    fieldStyle={{ color: 'white' }}
                    containerStyle={{ backgroundColor: '#aaa' }}
                />
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
