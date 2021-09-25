import { Container, ColorOption } from './styles';

const COLORS = [
    '#4731a8',
    '#4a2ac0',
    '#182599',
    '#131464',
    '#3657e7',
    '#3679b1',
    '#24aa94',
    '#2ad686',
    '#40a74e',
    '#22791f',
    '#0d5711',
    '#e2b215',
    '#6b411e',
    '#c25312',
    '#a32d1e',
    '#881919',
    '#4d0f0f',
    '#ff7ab8',
    '#ff55a4',
    '#681d49',
    '#642c66',
];

export default function BackgroundColorPage({ onColorClick }) {
    return (
        <Container>
            {COLORS.map(color => (
                <ColorOption
                    key={color}
                    type="button"
                    color={color}
                    onClick={() => onColorClick(color)}
                />
            ))}
        </Container>
    );
}
