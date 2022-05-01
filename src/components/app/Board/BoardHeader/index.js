import {
    Container,
    LeftSection,
    RightSection,
    BoardHeaderButton,
    BoardHeaderField,
    StarButton,
    BoardHeaderButtonWrapper,
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
                <BoardHeaderButtonWrapper>
                    <BoardHeaderButton title={teamName} tooltip="Team Name" />
                </BoardHeaderButtonWrapper>
                <BoardHeaderButtonWrapper>
                    <BoardHeaderButton title={visibility} tooltip="Board Visibility" />
                </BoardHeaderButtonWrapper>
                <BoardHeaderButtonWrapper>
                    <StarButton
                        onClick={onStarClick}
                        icon={[starred ? 'fas' : 'far', 'star']}
                        starred={starred}
                        tooltip={`Click to ${starred ? 'unstar' : 'star'} this board`}
                    />
                </BoardHeaderButtonWrapper>
            </LeftSection>
            <RightSection>
                <BoardHeaderButtonWrapper>
                    <BoardHeaderButton title={teamName} />
                </BoardHeaderButtonWrapper>
                {!isRightSidebarVisible && (
                    <BoardHeaderButtonWrapper>
                        <BoardHeaderButton
                            title="Show Menu"
                            iconName="ellipsis-h"
                            onClick={openRightSidebar}
                        />
                    </BoardHeaderButtonWrapper>
                )}
            </RightSection>
        </Container>
    );
}
