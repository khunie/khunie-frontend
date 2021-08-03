import styled from 'styled-components';
import Head from 'next/head';
import Section, {
    SectionContent,
    SectionHeader,
    Title,
    Subtitle,
    Row,
    Column,
} from 'components/common/Section';
import PricingCard from 'components/pricing/PricingCard';

/* const Title = styled.h1`
    font-size: 50px;
    color: ${({ theme }) => theme.colors.primary};
`; */

const Image = styled.img`
    width: 500px;
    border-radius: 16px;
`;

/* <Title gradient={['#a458fc', '#4772ff', '#05d6dd']}> */

export default function Home() {
    return (
        <>
            <Head>
                <title>khunie | Pricing</title>
            </Head>
            <Section>
                <SectionContent>
                    <Row>
                        <Title>Pricing</Title>
                    </Row>
                    <Row>
                        <PricingCard tier="Free" />
                        <PricingCard tier="Personal" />
                        <PricingCard tier="Business" />
                    </Row>
                </SectionContent>
            </Section>
        </>
    );
}
