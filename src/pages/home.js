import styled from 'styled-components';
import Head from 'next/head';
import Hero from 'components/home/Hero';
import Section, {
    SectionContent,
    SectionHeader,
    Title,
    Subtitle,
    Row,
    Column,
} from 'components/common/Section';

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
                <title>khunie | Home</title>
            </Head>
            <Hero />
            <Section>
                <SectionContent backgroundColor="black">
                    <Row>
                        <Column>
                            <SectionHeader>
                                <Title color="white">Come enjoy the first of its kind...</Title>
                                <Subtitle color="#ccc">
                                    It's never been more important - see Why
                                </Subtitle>
                            </SectionHeader>
                        </Column>
                        <Column>
                            <Image src="/img/woman-wearing-blue-top-standing-in-front-of-yellow-balloons-3533228.jpg" />
                        </Column>
                    </Row>
                </SectionContent>
            </Section>
            <Section>
                <SectionContent>
                    <SectionHeader>
                        <Title gradient={['#a458fc', '#05d6dd']}>Take the first step...</Title>
                        <Title>This is just the beginning.</Title>
                    </SectionHeader>
                    <Row>
                        <Column>Hey this is the content here for section 1</Column>
                        <Column>Hey this is the content here for section 1 coilumn 2</Column>
                        <Column>Hey this is the content here for section 1 coilumn 3</Column>
                    </Row>
                </SectionContent>
            </Section>
            <Section>
                <SectionContent backgroundColor="#291c9c">
                    <SectionHeader>
                        <Title gradient={['#bb3ecc', '#6675fa', '#64a6fc']}>
                            Join the community
                        </Title>
                        <Title color="white">We're embracing the human in us all.</Title>
                    </SectionHeader>
                    <Row>
                        <Column>Hey this is the content here for section 1</Column>
                        <Column>Hey this is the content here for section 1 coilumn 2</Column>
                        <Column>Hey this is the content here for section 1 coilumn 3</Column>
                    </Row>
                </SectionContent>
            </Section>
            <Section>
                <SectionContent>
                    <SectionHeader>
                        <Title gradient={['#a458fc', '#05d6dd']}>It's time...</Title>
                        <Title>Come see what you've been missing out on.</Title>
                    </SectionHeader>
                    <Row>
                        <Column>Hey this is the content here for section 1</Column>
                        <Column>Hey this is the content here for section 1 coilumn 2</Column>
                        <Column>Hey this is the content here for section 1 coilumn 3</Column>
                    </Row>
                </SectionContent>
            </Section>
            <Section>
                <SectionContent backgroundColor="black">
                    <SectionHeader>
                        <Title gradient={['#ff008c', '#ffa600']}>Shhh, don't fight it...</Title>
                        <Title color="white">Just let it happen.</Title>
                    </SectionHeader>
                    <Row>
                        <Column>Hey this is the content here for section 1</Column>
                        <Column>Hey this is the content here for section 1 coilumn 2</Column>
                        <Column>Hey this is the content here for section 1 coilumn 3</Column>
                    </Row>
                </SectionContent>
            </Section>
        </>
    );
}
