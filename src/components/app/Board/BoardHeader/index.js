import {
    Container,
    LeftSection,
    RightSection,
    BoardHeaderButton,
    BoardHeaderField,
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
                <BoardHeaderButton title={teamName} tooltip="Team Name" />
                <BoardHeaderButton title={visibility} tooltip="Board Visibility" />
                <StarButton
                    onClick={onStarClick}
                    icon={[starred ? 'fas' : 'far', 'star']}
                    starred={starred}
                    tooltip={`Click to ${starred ? 'unstar' : 'star'} this board`}
                />
            </LeftSection>
            <RightSection>
                <BoardHeaderButton title={teamName} />
                {!isRightSidebarVisible && (
                    <BoardHeaderButton
                        title="Show Menu"
                        iconName="ellipsis-h"
                        onClick={openRightSidebar}
                    />
                )}
            </RightSection>
        </Container>
    );
}
