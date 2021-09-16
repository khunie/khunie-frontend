import { Container, Row, Column, Username, Email, ProfilePicture } from './styles';

export default function ProfileCard({ avatar = '', username = '', email = '', onClick }) {
    const handleClick = () => {
        onClick?.();
    };

    return (
        <Container onClick={handleClick} hover={onClick}>
            <Row>
                <ProfilePicture src={avatar || '/img/test-pro-pic.png'} />
                <Column>
                    <Username>{username}</Username>
                    <Email>{email}</Email>
                </Column>
            </Row>
        </Container>
    );
}
