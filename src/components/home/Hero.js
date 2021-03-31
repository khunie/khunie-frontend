/** @prettier */

import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const Background = styled.div`
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const HeroContent = styled.div`
    padding: 96px 0 64px 0;
`;

const shine = keyframes`
    to {
        background-position: 200% center;
    }
`;

const fadeIn = keyframes`
    0% {
      visibility: visible;
      opacity: 0;
      transform: translateY(12px);
    }
  
    100% {
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const textGradient = css`
    background: linear-gradient(to right, #f36fd6, #ff6600, #f36fd6);
    background-size: auto;
    background-clip: border-box;
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 200% auto;
    color: #000;
`;

const TitleContainer = styled.div`
    margin-bottom: 64px;
`;

const Title = styled.h1`
    font-size: 80px;
    font-weight: 800;
    opacity: 0;
    padding: 8px;
    margin-bottom: -8px;
    letter-spacing: 0px;
    ${textGradient}
    animation: ${fadeIn} 1s ease-out forwards, ${shine} 20s linear infinite;
    animation-delay: ${props => props.animationDelay || '0s'};
`;

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const PrimaryCTA = styled.a`
    padding: 12px 24px;
    width: 180px;
    border: 2px solid #ff7b00;
    border-radius: 10px;
    color: #ff7b00;
    background-color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        color: #ff5100;
    }
`;

const StoreBadge = styled.img`
    height: 45px;
    margin: 0 8px;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 24px;
    color: pink;
`;

export default function Hero() {
    return (
        <Background>
            <HeroContent>
                <TitleContainer>
                    <Title animationDelay=".2s">Organizing your tasks</Title>
                    <Title animationDelay=".8s">made easy</Title>
                </TitleContainer>
                <ActionsContainer>
                    {/* <Row>
                        <PrimaryCTA>
                            Watch our explainer <Icon icon={['fab', 'github']} />
                            <Icon icon={faCoffee} size="sm" />
                        </PrimaryCTA>
                    </Row> */}
                    <Row>
                        <StoreBadge src="img/home/apple-store-badge.svg" />
                        <StoreBadge src="img/home/google-play-badge.svg" />
                    </Row>
                </ActionsContainer>
            </HeroContent>
        </Background>
    );
}
