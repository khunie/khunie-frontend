import { Container, ColorOption } from './styles';

export default function BackgroundColorPage({ onColorClick }) {
    return (
        <Container>
            <ColorOption
                type="button"
                color="#4731a8"
                delay={0.05}
                onClick={() => onColorClick('#4731a8')}
            />
            <ColorOption
                type="button"
                color="#4a2ac0"
                delay={0.1}
                onClick={() => onColorClick('#4a2ac0')}
            />
            <ColorOption
                type="button"
                color="#40a74e"
                delay={0.15}
                onClick={() => onColorClick('#40a74e')}
            />
            <ColorOption
                type="button"
                color="#3679b1"
                delay={0.2}
                onClick={() => onColorClick('#3679b1')}
            />
            <ColorOption
                type="button"
                color="#3657e7"
                delay={0.25}
                onClick={() => onColorClick('#3657e7')}
            />
        </Container>
    );
}
