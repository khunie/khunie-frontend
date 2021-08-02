import { Container, Row, Column, Username, Email, ProfilePicture } from './styles';

export default function ProfileCard({ image = '', username = '', email = '' }) {
    return (
        <Container>
            <Row>
                <ProfilePicture src="/img/test-pro-pic.png" />
                <Column>
                    <Username>{username}</Username>
                    <Email>{email}</Email>
                </Column>
            </Row>
        </Container>
    );
}
