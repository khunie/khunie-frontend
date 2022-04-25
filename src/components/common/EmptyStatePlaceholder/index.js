import { Container, Image, Subtitle, Title } from './styles';

export default function EmptyStatePlaceholder({
    title,
    subtitle,
    image,
    onContainerClick,
    actionTitle,
    imageStyle,
    titleStyle,
    subtitleStyle,
    containerStyle,
    action,
    onActionClick,
}) {
    return (
        <Container style={containerStyle}>
            <Image src={image} style={imageStyle} />
            <Title style={titleStyle}>{title}</Title>
            <Subtitle style={subtitleStyle}>{subtitle}</Subtitle>
        </Container>
    );
}
