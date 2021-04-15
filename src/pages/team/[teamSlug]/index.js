import { useRouter } from 'next/router';
import styled from 'styled-components';
import AppLayout from 'components/layout/AppLayout';

const Container = styled.div`
    background-color: #fff;
    padding: 32px;
`;

const Title = styled.h1`
    font-size: 32px;
    font-weight: bold;
`;

export default function TeamHome() {
    const router = useRouter();

    const { teamSlug } = router.query;

    return (
        <Container>
            <Title>hello friend, this is the team home for {teamSlug}</Title>
        </Container>
    );
}

TeamHome.layout = AppLayout;
