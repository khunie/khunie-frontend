import {
    Container,
    LeftSection,
    RightSection,
    BoardHeaderButton,
    BoardHeaderField,
    Star,
    StarButton,
} from './styles';

export default function BoardHeader({
    title,
    teamName,
    visibility,
    starred,
    onStarClick,
    isRightSidebarVisible,
    openRightSidebar,
}) {
    return (
        <Container>
            <LeftSection>
                <BoardHeaderField
                    title="Board Title"
                    initialValue={title}
                    fieldStyle={{ color: 'white', fontSize: 20 }}
                    inputStyle={{ fontSize: 20 }}
                />
                <BoardHeaderButton title="Team Name">{teamName}</BoardHeaderButton>
                <BoardHeaderButton title="Board Visibility">{visibility}</BoardHeaderButton>
                <StarButton
                    title={`Click to ${starred ? 'unstar' : 'star'} this board`}
                    onClick={onStarClick}
                >
                    <Star icon={[starred ? 'fas' : 'far', 'star']} starred={starred} />
                </StarButton>
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
